import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import { TemplateVariables } from "src/PageGeneration/model";
import { TagList } from "../../TagList/TagList.component";

const useStyles = makeStyles({
  root: {}

});

interface VariableListProps {

}

function normalizeValue(data: TemplateVariables) {
  if(!Array.isArray(data)) {
    // empty var is {} not []. whatever
    return [];
  }
  return data.map(d => d.name);
}

export function VariableList(props: VariableListProps) {
  const classes = useStyles(props);

  const vars: TemplateVariables = useSelector((state: StoreState) => state.ruleDetail.rule.datum.variables);

  const _data = normalizeValue(vars);
  return (
    <div className={classes.root}>
      <TagList sources={_data}
        type="default"
        getter={d => d}/>

    </div>
  );
}
