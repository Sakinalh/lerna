import React, {
  ChangeEvent as ReactChangeEvent,
  FormEvent as ReactFormEvent,
  useEffect,
  useState
} from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  AreaSubZoneItemFormInterface,
  FormState,
  ProductFormInterface,
  StoreState
} from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, InputLabel } from "src/deps";
import {
  setCatalogProductAction,
  tryGetAreaProducts
} from "src/PageGeneration/store/areaProduct.epic";
import {
  OutlinedCheckboxCheckedIcon,
  OutlinedCheckboxIcon
} from "src/PageGeneration/shared/style";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import {
  BaseFormElementState,
  FormElementState,
  formStateToPayload,
  formStateValidation,
  makeReactiveStateForm,
  updateFormState
} from "src/shared/form";
import {
  TemplateAreaItemProduct,
  TemplateCatalogApi
} from "src/PageGeneration/model";
import {
  getInterpreterRouteParams,
  getProp
} from "src/PageGeneration/shared/helper";
import produce from "immer";
import { patchRuleZonesAction } from "src/PageGeneration/store/rule.epic";
import { AppAutoComplete } from "src/components/AppAutoComplete/AppAutoComplete";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { AppSelect } from "src/components/AppSelect/AppSelect.component";

import TextField from "@mui/material/TextField";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { getValidAreaProductZone, parseAreaProductForm } from "../helper";
import { TagList } from "../../TagList/TagList.component";

const useStyles = makeStyles(theme => ({
  root: {},
  form: {},
  content: {
    backgroundColor: "white",
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    padding: 20,
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },

  formMain: {},

  formGrpWrap: {},
  formControl: {
    marginLeft: "inherit",
    padding: "20px 0",
    opacity: 0.8
  },
  checkbox: {
    paddingLeft: "inherit"
  },
  autoComplete: {
    marginTop: "5px",
    border: "1px solid #E6E8ED",
    borderRadius: theme.shape.border.radiusMin,
    backgroundColor: "white"
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  actions: {
  },
  formAside: {},
  varList: {
    paddingTop: 5
  },
  border: {
    border: theme.shape.border.dashedGrey,
    padding: 10
  },
  wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  textField: {
    marginLeft: 2,
    marginRight: 2,
    width: 80,
    display: "flex",
    justifyContent: "center",
    right: 3,
    left: 3,
    fontSize: 10,
    "& p": {
      color: "red",
      fontSize: 9
    }
  }
}));

interface AreaProductCatalogProps {
  selectedZone: TemplateAreaItemProduct;
  onClose: Function;
  isActiveTab: boolean;
}

function filterSelection(fullList: TemplateCatalogApi[], selection: number[]) {
  return fullList.filter(l => selection.find(s => s === l.id));
}

export function AreaProductCatalog({
  selectedZone,
  onClose,
  isActiveTab
}: AreaProductCatalogProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const appState: StoreState = useSelector((state: StoreState) => state);

  const areaProduct = appState.ruleDetail.areaProduct;

  const areaProductZone: TemplateAreaItemProduct = useSelector(
    (state: StoreState) =>
      getValidAreaProductZone(state.ruleDetail.rule.datum.zones, selectedZone)
  );
  const [form, setForm] = useState<any>(parseAreaProductForm(areaProductZone));
  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");
  const { templateId } = getInterpreterRouteParams(window.location.pathname);

  useEffect(() => {
    dispatch(
      tryGetAreaProducts({ onSuccess: setCatalogProductAction, id: templateId })
    );
  }, [dispatch, templateId]);

  useEffect(() => {
    setFormValidity(formStateValidation(form));
  }, [form, dispatch]);

  useEffect(() => {
    if(!isActiveTab) {
      setForm((prevForm) => {
        dispatch(
          patchRuleZonesAction({
            id: selectedZone.zone_id,
            value: formStateToPayload<
              TemplateAreaItemProduct,
              ProductFormInterface
            >(prevForm)
          })
        );

        return prevForm;
      });
    }
  }, [isActiveTab, dispatch, selectedZone.zone_id]);

  function handleCancel(ev: ReactChangeEvent<EventTarget>) {
    ev.preventDefault();
    setForm(parseAreaProductForm(areaProductZone));
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();
    dispatch(
      patchRuleZonesAction({
        id: selectedZone.zone_id,
        value: formStateToPayload<
          TemplateAreaItemProduct,
          ProductFormInterface
        >(form)
      })
    );
    onClose();
  }

  function handleCheckboxChange(ev, idx: number) {
    const selection: any = form.sub_zones.formArray[idx];
    const nextValue = ev.target.checked;

    if(selection) {
      const updateRuleCtrl = produce<BaseFormElementState>(
        selection.formGroup.rule.formGroup.optimize_sequence,
        (draftState) => {
          draftState.__value = nextValue;
          draftState.isPristine = false;
        }
      );

      setForm(
        produce(form, (draftState) => {
          draftState.sub_zones = updateFormState(
            form.sub_zones,
            updateRuleCtrl
          );
        })
      );
    }
  }

  function handleFormGroupChange(idx) {
    return (payload: { [prop: string]: FormElementState }) => {
      const selection: any = form.sub_zones.formArray[idx];
      const key = "sub".concat(idx.toString());
      const {
        [key]: { __value }
      } = payload;

      if(selection) {
        const updateRuleCtrl = produce<BaseFormElementState>(
          selection.formGroup.rule.formGroup.value,
          (draftState) => {
            draftState.__value = __value;
            draftState.isPristine = false;
          }
        );
        setForm(
          produce(form, (draftState) => {
            draftState.sub_zones = updateFormState(
              form.sub_zones,
              updateRuleCtrl
            );
          })
        );
      }
    };
  }
  function onChangeFormat(value, idx) {
    const selection: any = form.sub_zones.formArray[idx];
    if(selection) {
      const updateRuleCtrl = produce<BaseFormElementState>(
        selection.formGroup.rule.formGroup.format,
        (draftState) => {
          draftState.__value = value;
          draftState.isPristine = false;
        }
      );
      setForm(
        produce(form, (draftState) => {
          draftState.sub_zones = updateFormState(
            form.sub_zones,
            updateRuleCtrl
          );
        })
      );
    }
  }
  function handleSelectChange(selection: number[]) {
    const updateSourcesCtrl = updateFormState(form.rule, {
      ...makeReactiveStateForm(selection, [], false, "sources"),
      __path: ["formGroup", "sources"] // quick hack to preserve path with creating new state
    });

    setForm(
      produce(form, (draftState) => {
        draftState.rule = updateSourcesCtrl;
      })
    );
  }
  function onChangeHeight(e, idx) {
    const h = e.target.value;
    const selection: any = form.sub_zones.formArray[idx];
    if(selection) {
      const updateRuleCtrl = produce<BaseFormElementState>(
        selection.formGroup.rule.formGroup.height,
        (draftState) => {
          draftState.__value = h;
          draftState.isPristine = false;
        }
      );
      setForm(
        produce(form, (draftState) => {
          draftState.sub_zones = updateFormState(
            form.sub_zones,
            updateRuleCtrl
          );
        })
      );
    }
  }
  function onChangeWidth(e, idx) {
    const w = e.target.value;
    const selection: any = form.sub_zones.formArray[idx];
    if(selection) {
      const updateRuleCtrl = produce<BaseFormElementState>(
        selection.formGroup.rule.formGroup.width,
        (draftState) => {
          draftState.__value = w;
          draftState.isPristine = false;
        }
      );

      setForm(
        produce(form, (draftState) => {
          draftState.sub_zones = updateFormState(
            form.sub_zones,
            updateRuleCtrl
          );
        })
      );
    }
  }
  function onChangeNProducts(e) {
    const updateSourcesCtrl = updateFormState(form.rule, {
      ...makeReactiveStateForm(parseInt(e.target.value, 10), [], false, "n_products"),
      __path: ["formGroup", "n_products"] // quick hack to preserve path with creating new state
    });

    setForm(
      produce(form, (draftState) => {
        draftState.rule = updateSourcesCtrl;
      })
    );
  }
  function renderCommentCtrl() {
    try {
      return form.sub_zones.formArray.map(
        (f: AreaSubZoneItemFormInterface, idx) => {
          const key = "sub".concat(idx.toString());
          const { type } = f.getValue();
          if(type === "image") {
            const height = f.formGroup.rule.formGroup.height.getValue();
            const width = f.formGroup.rule.formGroup.width.getValue();
            return (
              <div key={idx} style={{display: "flex", flexDirection: "row"}}>
                <FormControlLabel
                key={key}
                control={
                  <AppCheckbox
                    whiteBg
                    checked={f.formGroup.rule.formGroup.optimize_sequence.getValue()}
                    onChange={event => handleCheckboxChange(event, idx)}
                    name="optimized"
                    classes={{ root: classes.checkbox }}
                  />
                }
                label="Optimize the sequencing of images for each product"
                classes={{ root: classes.formControl }}
              />
                <TextField
                        label="height"
                        type="number"
                        helperText={height > 1024 || height < 200 ? "min height = 200 max height = 1024" : ""}
                        value={height}
                        variant="outlined"
                        size="small"
                        className={classes.textField}
                        margin="normal"
                        onChange={event => onChangeHeight(event, idx)}
                     />
                <TextField
                        label="width"
                        type="number"
                        className={classes.textField}
                        value={width}
                        helperText={width > 1024 || width < 200 ? "min width = 200 max width = 1024" : ""}
                        variant="outlined"
                        size="small"
                        margin="normal"
                        onChange={event => onChangeWidth(event, idx)}
                      />
              </div>

            );
          }
          return (
            <div key={idx} className={classes.wrap} >
              <div style={{width: "100%"}}>
                <AppFormGroup
              key={key}
              inputKey={key}
              inputState={f.formGroup.rule.formGroup.value}
              formGroupChange={handleFormGroupChange(idx)}
              label={f.getValue().comment}
              inputProps={{
                "aria-describedby": "subzone field"
              }}
            />
              </div>
              <AppSelect
                value={f.formGroup.rule.formGroup.format.getValue()}
                onChangeFormat={e => onChangeFormat(e, idx)}/>
            </div>
          );
        }
      );
    } catch (e) {
      // eslint-disable-next-line
      console.warn(e, "fail rendering subzone", form.sub_zones);
      return <p>failed to display sub zone </p>;
    }
  }

  function coerceType(opt: TemplateCatalogApi | string) {
    return opt.hasOwnProperty("id") ? (opt as TemplateCatalogApi).id : opt;
  }

  const selection = form.rule.getValue().sources;

  return (
    <section className={classes.root}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.content}>
          <div className={classes.formMain}>
            <div className={classes.formGrpWrap}>
              <AppText
                text={TRANSLATE.modal.productCatalog}
                themeColor="neutralColor"
                capitalize="all"
              />
              <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{width: "100%"}}>
                  <AppAutoComplete<TemplateCatalogApi>
                inputKey="catalog"
                keyProp="id"
                placeholder="Type a product catalog name"
                data={areaProduct.catalog_list.results}
                selectedData={selection as any}
                getOptionLabel={option => option.name}
                getOptionSelected={(opt: any, value: any) => value === coerceType(opt)}
                getSelectedOptionValue={coerceType}
                getCheckboxLabel={opt => opt.name}
                onUpdateSelection={handleSelectChange}
                overrideClass={{
                  autoComplete: classes.autoComplete
                }}
              />
                </div>
                <TextField
                  label="Products Number"
                  value={form.rule.formGroup.n_products.getValue()}
                  variant="outlined"
                  size="small"
                  onChange={onChangeNProducts}
                  type="number"
                  style={{display: "flex", justifyContent: "center", left: 3, fontSize: 10}}
               />
              </div>
              <TagList
                sources={filterSelection(
                  areaProduct.catalog_list.results,
                  selection
                )}
                type="default"
                getter={getProp("name")}
              />
            </div>

            <div className={classes.formGrpWrap}>{renderCommentCtrl()}</div>
          </div>
          {/* <div>
                        <AreaProductViewer data={areaProduct.product_list.results}/>
                        <VariableList/>

                    </div> */}
        </div>
        <footer className={classes.formActions}>
          <GenerationCancelBtn onClick={handleCancel} />
          <AppSaveBtn formValidity={formValidity} />
        </footer>
      </form>
    </section>
  );
}
