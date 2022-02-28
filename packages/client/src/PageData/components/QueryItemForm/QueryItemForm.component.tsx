import { AppText } from "src/components/AppText/AppText.component";
import { DetailCampaign } from "src/components/DetailCampaign/DetailCampaign.component";
import { DetailAdgroup } from "src/components/DetailAdgroup/DetailAdgroup.component";
import makeStyles from "@mui/styles/makeStyles";
import { PageKwdInterfaceView, RuleKeyword } from "src/PageGeneration/model";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { MouseEvent as ReactMouseEvent, useEffect, useState } from "react";
import { BaseFormElementState, FormElementState, makeReactiveStateForm } from "src/shared/form";
import produce from "immer";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { DetailKeywordSearch } from "src/components/DetailKwd/DetailKwdSearch/DetailKwdSearch.component";
import { FormState, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { DetailKwdList } from "src/components/DetailKwd/DetailKwdList/DetailKwdList.component";
import { setQueryFormStateAction, trySaveAnalyticQueryAction } from "src/PageData/store/queryEpic$";
import { SaveQueryItem } from "../../model/analytics";

const useStyles = makeStyles(theme => ({
  form: {
    padding: "30px 50px"
  },
  title: {
    fontSize: "1.2em",
    padding: "30px 0"
  },
  name: {
    padding: "30px 0",
    border: `1px solid ${theme.palette.grey.light}`
  },
  wrap: {
    width: "80%",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "30% 60%",
    gridColumnGap: 60,
    alignItems: "center"
  },
  kwdDetails: {
    color: theme.palette.grey.light
  },
  filters: {
    display: "grid",
    gridTemplateColumns: "49% 49%",
    gridColumnGap: 60
  },
  cta: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

interface KeywordIDSControl extends BaseFormElementState {
    formArray: FormElementState[]
}

export interface SaveQueryItemForm extends BaseFormElementState {
    formGroup: {
        search_name: FormElementState;
        keyword_IDS: KeywordIDSControl;
    };
}

interface QueryItemFormProps {
    datum: SaveQueryItem;
}

export function QueryItemForm({ datum }: QueryItemFormProps) {
  const classes = useStyles({});
  const [form, setForm] = useState<SaveQueryItemForm>(makeReactiveStateForm(datum, [], true));

  const data: RuleKeyword[] = useSelector((state: StoreState) => state.ruleDetail.keywords.list.results);
  const formState: FormState = useSelector((state: StoreState) => state.analyticsQuery.formState);

  const dispatch = useDispatch();
  const [next, setNext] = useState<{ selection: RuleKeyword[]; }>({
    selection: data
  });

  const [nextSelectionState, setSelectionState] = useState<"idle" | "reset">("idle");
  useEffect(() => {
    const ids = next.selection.map(kwd => kwd.id);
    setForm(
      f => produce(f, (draftState: SaveQueryItemForm) => {
        draftState.formGroup.keyword_IDS = makeReactiveStateForm(ids, [], false);
        draftState.__value.keyword_IDS = ids;
      })
    );
  }, [next.selection]);

  useEffect(() => {
    if(formState === "success") {
      setForm(_f => makeReactiveStateForm({
        search_name: "",
        keyword_IDS: []
      }, [], true));

      setNext(
        _s => ({ selection: [] })
      );
      setSelectionState("reset");
    }

    if(formState === "idle") {
      setSelectionState("idle");
    }
  }, [formState]);

  function handleFormGroupChange(ctrl: { search_name: FormElementState }) {
    setForm(produce(form, (draftState: SaveQueryItemForm) => {
      draftState.formGroup.search_name = ctrl.search_name;
      draftState.__value.search_name = ctrl.search_name.getValue();
    }));

    const _val = form.__value;
    const isValid = ctrl.search_name.getValue() && _val.keyword_IDS ? "valid" : "invalid";
    dispatch(setQueryFormStateAction(isValid));
  }

  function handleSelectKwd(payload: PageKwdInterfaceView) {
    setNext(prev => ({ selection: prev.selection.concat([{ id: payload.keyword_id, name: payload.keyword_name }]) }));
  }

  function handleSubmit(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(trySaveAnalyticQueryAction(form.getValue()));
  }
  // eslint-disable-next-line
  console.info(data);

  // cannot define the classes.form as form as the DetailCampaign/DetailAdgroup already contains form
  return (
    <div className={classes.form}
    >
      <AppText text="advanced search" capitalize="first" props={{ variant: "h2", classes: { root: classes.title } }}/>

      <div className={classes.name}>
        <div className={classes.wrap}>
          <div>
            <AppText text="name your query" capitalize="first"
              props={{ variant: "h3", classes: { root: classes.title } }}/>
            <AppText text={"first provide a name to your query"} capitalize="first"/>

          </div>

          <AppFormGroup
            inputKey="search_name"
            inputState={form.formGroup.search_name}
            formGroupChange={handleFormGroupChange}
            inputProps={{
              "aria-describedby": "name analytics query"
            }}
            customValidations={["required"]}
          />
        </div>

      </div>

      <AppText text="select campaigns and adgroup" capitalize="first"
        props={{ variant: "h2", classes: { root: classes.title } }}/>

      <div className={classes.kwdDetails}>

        <DetailKeywordSearch selection={next.selection}
          onSelectValue={handleSelectKwd}
        />
        <div className={classes.filters}>
          <DetailCampaign nextState={nextSelectionState}/>
          <DetailAdgroup nextState={nextSelectionState}/>
        </div>
        <DetailKwdList selection={next.selection} onSelectValue={handleSelectKwd}/>

      </div>
      <div className={classes.cta}>
        <AppSaveBtn formValidity={formState}
          defaultLabel="save new query"
          onClick={handleSubmit}/>
      </div>
    </div>
  );
}
