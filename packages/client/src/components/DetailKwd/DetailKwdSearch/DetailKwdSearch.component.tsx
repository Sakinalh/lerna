import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AppAutoComplete } from "src/components/AppAutoComplete/AppAutoComplete";
import { PageKwdInterfaceView, RuleKeyword } from "src/PageGeneration/model";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%"
  },
  formMain: {},

  formGrp: {
    border: "none",
    padding: "5px 0",
    margin: "inherit"
  },
  formLabel: {},
  formInput: {
    border: `1px solid ${theme.palette.grey.middle2}`,
    borderRadius: theme.shape.border.radiusMin
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "end"
  },
  autoComplete: {
    border: theme.shape.border.solidGrey,
    backgroundColor: "white",
    paddingLeft: 4,
    borderRadius: 4
  }
}));

function matchWithCurrentDataset(
  selection: RuleKeyword[],
  kds: PageKwdInterfaceView[]
) {
  return selection.filter(el =>
    kds.find(k => k.keyword_id === el.id)) as any;
}

interface DetailKeywordSearchProps {
    selection: RuleKeyword[];
    onSelectValue: (sel: PageKwdInterfaceView) => void;
    placeHolder?: string;
}

/**
 * handle mismatch between loaded and saved kwds
 * @param selection
 * @param onSelectValue
 * @param placeHolder
 * @constructor
 */
export function DetailKeywordSearch({
  selection,
  onSelectValue,
  placeHolder = ""
}: DetailKeywordSearchProps) {
  const classes = useStyles({});
  const keywords: PageKwdInterfaceView[] = useSelector(
    (state: StoreState) => state.ruleDetail.keywords.list.results
  );

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <fieldset className={classes.formGrp}>
        <AppAutoComplete<PageKwdInterfaceView>
          inputKey="selection__page_kwd"
          keyProp="keyword_id"
          data={keywords}
          placeholder={placeHolder}
          selectedData={matchWithCurrentDataset(selection, keywords)}
          getOptionLabel={option => option.keyword_name ? option.keyword_name : "n/a"}
          getOptionSelected={(opt: any, value: any) => opt.keyword_id === value.id}
          getSelectedOptionValue={(opt: any) => opt.keyword_id}
          getCheckboxLabel={opt => opt.keyword_name}
          onSelectValue={onSelectValue}
          overrideClass={{
            autoComplete: classes.autoComplete
          }}
        />
      </fieldset>
    </form>
  );
}
