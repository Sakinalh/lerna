import React, {
  ChangeEvent as ReactChangeEvent,
  FormEvent as ReactFormEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useState
} from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormState, ProductFilterItemForm, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "src/deps";
import * as TRANSLATE from "src/shared/translation/en.json";
import {
  FormElementState,
  formStateValidation,
  makeReactiveStateForm,
  mergeAppFormGroup,
  patchAppFormGroup
} from "src/shared/form";
import {
  AreaProductRuleFilter,
  CatalogFilterApi,
  CatalogFilterItemApi,
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText
} from "src/PageGeneration/model";
import { setProductsMetaFilters, tryGetProductsMetaFilters } from "src/PageGeneration/store/areaProduct.epic";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { AppFormGroupSelect } from "src/components/AppFormGroupSelect/AppFormGroupSelect.component";
import { safeGet } from "src/shared/utils";
import { AppAutoComplete } from "src/components/AppAutoComplete/AppAutoComplete";
import produce from "immer";
import { ClearOutlined } from "@mui/icons-material/";
import { patchRuleZonesAction } from "src/PageGeneration/store/rule.epic";
import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { getValidAreaProductZone } from "../helper";
import { FormGroupFilterRange } from "../../FormGroupFilterRange/FormGroupFilterRange.component";
import { VariableList } from "../../VariablesActions/VariableList/VariableList.component";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "50% 40%",
    paddingTop: 15
  },
  row: {
    display: "grid",
    gridTemplateColumns: "50px auto"
  },
  form: {},
  content: {},
  formMain: {},
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  autoComplete: {
    backgroundColor: "white",
    border: theme.shape.border.solidGrey
  },
  selection: {
    paddingTop: 5
  },
  border: {
    border: theme.shape.border.dashedGrey,
    padding: 10
  },
  inputLabel: {

    opacity: 0.8
  },
  icons: {
    display: "flex",
    alignItems: "flex-end",
    color: theme.palette.red.main
  },
  variable: {
    paddingLeft: 20
  },
  variableContent: {
    border: theme.shape.border.dashedGrey
  }
}));

interface AreaProductMetaProps {
    selectedZone: TemplateAreaItemProduct;
    onClose: Function
}

interface CatalogFilterFlattenApi extends CatalogFilterItemApi {
    category_display: string;
    category_name: string;
}

/**
 * for group in material ui, sort by key
 * @param list
 */
function flattenFilters(list: CatalogFilterApi[]): CatalogFilterFlattenApi[] {
  if(!Array.isArray(list)) {
    // eslint-disable-next-line
    console.warn("filters are not a list. probably an error because ....", list);
    return list;
  }
  return list.reduce((acc: CatalogFilterFlattenApi[], curr) => {
    const { category_display, category_name, filters } = curr;
    return acc.concat(
      filters.map(f => ({ ...f, category_display, category_name }))
    );
  }, []).sort(
    (a, b) => a.category_name > b.category_name ? 1 : -1
  );
}

function getDisplayFilterProps(filters: CatalogFilterFlattenApi[], filter_name): { filter_display: string, filter_values: Array<{ value: string; viewValue: string }> } {
  try {
    const displayFilterValue = Array.isArray(filters) && filters.find(el => el.filter_name === filter_name);

    if(displayFilterValue) {
      const { filter_display, filter_values } = displayFilterValue;
      return {
        filter_display,
        filter_values:
                    filter_values.map(f => ({ value: f, viewValue: f }))
      };
    }

    return {
      filter_display: "default",
      filter_values: []
    };
  } catch (e) {
    // eslint-disable-next-line
    console.warn(e, "failed to parse filter ", filter_name);
    return {
      filter_display: "default",
      filter_values: []
    };
  }
}

function parseForm(data: AreaProductRuleFilter[], isPristine = true): ProductFilterItemForm[] {
  return data.map((filter, idx) => makeReactiveStateForm(filter, [], isPristine, idx.toString()));
}

function getValidAreaProductFilter(list: Array<TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct>, zone): AreaProductRuleFilter[] {
  const filters = safeGet(zone, "rule", "filters");
  if(!Array.isArray(filters)) {
    return [];
  }

  return filters;
}

function coerceType(item: AreaProductRuleFilter | CatalogFilterFlattenApi) {
  if(item.hasOwnProperty("filter_type")) {
    if((item as CatalogFilterFlattenApi).filter_type === "text") {
      // set default value for select
      const defaultValue = item.hasOwnProperty("filter_values") ? [(item as CatalogFilterFlattenApi).filter_values[0]] : [];
      return {
        value: defaultValue,
        type: (item as CatalogFilterFlattenApi).filter_type,
        filter_name: item.filter_name,
        min_value: "null",
        max_value: "null"
      };
    } else {
      return {
        value: [],
        type: (item as CatalogFilterFlattenApi).filter_type,
        filter_name: item.filter_name,
        min_value: 0,
        max_value: 0
      };
    }
  }

  return item;
}

function updateSelection(filtersForm: ProductFilterItemForm[], selection: Array<AreaProductRuleFilter | CatalogFilterFlattenApi>) {
  if(selection.length === 0) {
    return [];
  }
  if(selection.length > filtersForm.length) {
    const el = selection[selection.length - 1];

    return produce(filtersForm, (draftState) => {
      draftState.push(
        makeReactiveStateForm(coerceType(el), [], true, filtersForm.length.toString())
      );
    });
  } else {
    const _sel = selection.map(s => s.filter_name);
    const idx = filtersForm.findIndex(el => !_sel.includes(el.getValue().filter_name));
    return produce(filtersForm, (draftState) => {
      draftState.splice(idx, 1);
      // update key/index, no need for the path as is root
      // eslint-disable-next-line
      draftState.forEach(function (ctrlState, i) {
        ctrlState.__key = i.toString();
      });
    });
  }
}

export function AreaProductMeta({ selectedZone, onClose }: AreaProductMetaProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const zoneProduct: TemplateAreaItemProduct = useSelector((state: StoreState) => getValidAreaProductZone(state.ruleDetail.rule.datum.zones, selectedZone));

  const areaProductFilters: AreaProductRuleFilter [] = useSelector((state: StoreState) => getValidAreaProductFilter(state.ruleDetail.rule.datum.zones, zoneProduct));

  const [form, setForm] = useState<ProductFilterItemForm[]>(parseForm(areaProductFilters));
  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  const { product_filters } = useSelector((state: StoreState) => state.ruleDetail.areaProduct.metas);

  const filters: CatalogFilterFlattenApi[] = flattenFilters(product_filters);

  /* to avoid instance using use state
    *   //https://reactjs.org/docs/hooks-reference.html#functional-updates
                setForm(f=>  [])
                * */
  useEffect(() => {
    if(zoneProduct.rule.sources.length > 0) {
      dispatch(tryGetProductsMetaFilters(zoneProduct.rule.sources.join()));
    } else {
      dispatch(setProductsMetaFilters([]));
    }
  }, [dispatch, zoneProduct.rule.sources]);

  useEffect(() => {
    setFormValidity(formStateValidation(form));
  }, [form, dispatch]);

  function handleCancel(ev: ReactChangeEvent<EventTarget>) {
    ev.preventDefault();

    setForm(parseForm(areaProductFilters));
  }

  function handleDelete(ev: ReactMouseEvent, idx: number) {
    setForm(
      produce(form, (draftState) => {
        draftState.splice(idx, 1);
      })
    );
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const update = produce(zoneProduct, (draftState) => {
      draftState.rule.filters = form.map(f => f.getValue());
    });
    dispatch(patchRuleZonesAction({
      id: selectedZone.zone_id,
      value: update
    }));
    onClose();
  }

  function handleSelectChange(selected: Array<AreaProductRuleFilter | CatalogFilterFlattenApi>) {
    setForm(updateSelection(form, selected));
  }

  function handleUpdate(filter_name, idx: number, type: "text" | "numeric") {
    return (f: { [prop: string]: FormElementState }) => {
      const selection = form[idx];
      if(type === "text") {
        // escape spec characters like double quote
        const inputValue = f[filter_name].getValue();

        const updateSelection = produce(selection, (draftState) => {
          draftState.formGroup = patchAppFormGroup("value", [inputValue], selection.formGroup, []);
          draftState.__value.value = [inputValue];
          draftState.isPristine = false;
        });

        setForm(
          produce(form, (draftState) => {
            draftState[idx] = updateSelection;
          })
        );
      }

      if(type === "numeric") {
        const { min_value, max_value } = (f as any).getValue() as any;
        setForm(
          produce(form, (draftState) => {
            draftState[idx] = mergeAppFormGroup({ min_value, max_value }, f as any);
          })
        );
      }
    };
  }

  function renderInput(f: ProductFilterItemForm, idx: number) {
    const { type, filter_name } = f.getValue();
    const keyCtrl = idx.toString();

    const { filter_display, filter_values } = getDisplayFilterProps(filters, filter_name);

    if(type === "text" && filter_values.length > 0) {
      return (
        <div className={classes.row}
          key={keyCtrl}>
          <IconButton
            classes={{ root: classes.icons }}
            onClick={ev => handleDelete(ev, idx)}
            aria-label="clear filter"
            size="large">
            <ClearOutlined/>
          </IconButton>
          <AppFormGroupSelect inputState={f.formGroup.value as any}
            inputKey={filter_name}
            formGroupChange={handleUpdate(f.getValue().filter_name, idx, type)}
            valueGetter={opt => opt.value}
            labelGetter={opt => opt.viewValue}
            label={filter_display}
            list={filter_values}/>
        </div>
      );
    }

    switch (type) {
      case "text": {
        return (
          <div className={classes.row}
          key={keyCtrl}>
            <IconButton
            classes={{ root: classes.icons }}
            onClick={ev => handleDelete(ev, idx)}
            aria-label="clear filter"
            size="large">
              <ClearOutlined/>
            </IconButton>

            <AppFormGroup key={keyCtrl}
            inputState={f.formGroup.value as FormElementState}
            inputKey={filter_name}
            formGroupChange={handleUpdate(f.getValue().filter_name, idx, type)}
            label={filter_display}
            inputProps={
              {
                "aria-describedby": filter_name
              }
            }/>

          </div>
        );
      }

      case "numeric": {
        return (
          <div className={classes.row}
          key={keyCtrl}>
            <IconButton
            classes={{ root: classes.icons }}
            onClick={ev => handleDelete(ev, idx)}
            aria-label="clear filter"
            size="large">

              <ClearOutlined/>
            </IconButton>
            <FormGroupFilterRange
            keys={["min_value", "max_value"]}
            label={filter_display}
            onValueChange={handleUpdate(f.getValue().filter_name, idx, type)}
            inputState={f as any}
          />
          </div>
        );
      }

      default: {
      // eslint-disable-next-line
      console.warn("failed to render", type);
        return <span key={keyCtrl}>missing filter </span>;
      }
    }
  }

  const selectedOption = form.map(f => f.getValue()).filter(f => filters.find(el => el.filter_name === f.filter_name));
  /* TODO ?
        handle tangling filters on submit. could have filters that are not in selected catalogues/sources
        will need to add filters params to denormalizeRulePayload to do it
    * */
  const filteredForm = form.filter(ctrl => filters.find(el => el.filter_name === ctrl.getValue().filter_name))
    .map((f, idx) => renderInput(f, idx));

  return (
    <section className={classes.root}>
      <main>

        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className={classes.content}>
            <div className={classes.formMain}>
              <p>Product filters</p>
              <AppAutoComplete<CatalogFilterFlattenApi>
                inputKey="product_filter"
                keyProp="filter_name"
                data={filters}
                placeholder="Type a word"
                selectedData={selectedOption as any}
                getOptionLabel={option => option.filter_display}
                getOptionSelected={(opt, value) => value.filter_name === opt.filter_name}
                getSelectedOptionValue={opt => opt}
                getCheckboxLabel={opt => opt.filter_name}
                groupBy={opt => opt.category_name}
                onUpdateSelection={handleSelectChange}
                overrideClass={{
                  autoComplete: classes.autoComplete
                }}
              />

            </div>
            <div className={classes.selection}>

              {filteredForm}

            </div>
          </div>
          <footer className={classes.formActions}>
            <GenerationCancelBtn onClick={handleCancel}/>
            <AppSaveBtn formValidity={formValidity}/>
          </footer>
        </form>
      </main>

      <aside className={classes.variable}>

        <AppText text={TRANSLATE.modal.available}
          themeColor="neutralColor"
          capitalize={"all"}
        />
        <div className={classes.variableContent}>
          <VariableList/>
        </div>
      </aside>
    </section>
  );
}
