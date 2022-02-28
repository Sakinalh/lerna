import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormControl, MenuItem, Select } from "src/deps";
import { TemplateListRuleApi } from "src/PageGeneration/model";
import { UnfoldMore } from "@mui/icons-material";
import * as TRANSLATE from "src/shared/translation/en.json";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 0,
    height: 32

  },
  menu: {
    height: "100%",
    padding: 5,
    fontSize: "inherit",
    color: "black",
    paddingLeft: 3
  },
  borderSelect: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 5
  }
});

interface TemplateCellSelectActionsProps {
    data: TemplateListRuleApi[];
    onSelect: Function
}

/**
 * the rule delete will delet active selection
 * one way is to check for the value and fallback to default case
 * @param value
 * @param list
 */
function handleUpdateList(value: string, list: TemplateListRuleApi[]) {
  return list.find(l => l.rule_name === value) ? value : "add";
}

export function TemplateCellSelectActions({ data, onSelect }: TemplateCellSelectActionsProps) {
  const classes = useStyles({});

  const [rule, setRule] = React.useState("add");

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setRule(event.target.value as string);
  }

  return (
    <FormControl>
      <Select
        labelId="row-action"
        value={handleUpdateList(rule, data)}
        onChange={handleChange}
        classes={{ root: classes.root, outlined: classes.borderSelect }}
        variant="outlined"
        color="secondary"
        IconComponent={UnfoldMore}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}
      >
        <MenuItem
          onClick={_e => onSelect(null)}
          key={"cancel_selection"}
          classes={{ root: classes.menu }}
          value={"add"}>
          {TRANSLATE.shared.createGeneration}
        </MenuItem>
        {
          data.map((d, idx) => (
            <MenuItem
              onClick={_e => onSelect(d.rule_id)}
              key={`${d.rule_id}_${idx}`}
              classes={{ root: classes.menu }}
              value={d.rule_name}>
              {d.rule_name}

            </MenuItem>
          ))
        }

      </Select>
    </FormControl>

  );
}
