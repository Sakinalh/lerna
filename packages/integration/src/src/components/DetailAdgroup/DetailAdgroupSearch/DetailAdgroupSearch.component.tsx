import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { PageAdgroupInterface } from "src/PageGeneration/model";
import { AppAutoComplete } from "src/components/AppAutoComplete/AppAutoComplete";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    borderBottom: theme.shape.border.solidGrey
  },

  formMain: {},

  formGrp: {
    border: "none",
    padding: "inherit",
    margin: "inherit"
  },
  autoComplete: {
    border: theme.shape.border.solidGrey,
    padding: 6
  },
  formLabel: {},
  formInput: {
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "end"
  }
}));

export interface DetailAdgroupSearchProps {
    onSelect: Function;
    selection: PageAdgroupInterface[];

}

export function DetailAdgroupSearch({ onSelect, selection }: DetailAdgroupSearchProps) {
  const classes = useStyles({});
  const adgroups: PageAdgroupInterface[] = useSelector(
    (state: StoreState) =>
      state.ruleDetail.adgroups.list.results
  );

  function handleSelectChange(value: PageAdgroupInterface) {
    const selectionPos = selection.findIndex(el => el.adgroup_id === value.adgroup_id);

    if(selectionPos < 0) {
      onSelect({ action: "ADD", value });
    } else {
      onSelect({ action: "REMOVE", value });
    }
  }

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
    >
      <fieldset className={classes.formGrp}>
        <AppAutoComplete<PageAdgroupInterface>
          inputKey="selection__page_adg"
          keyProp="adgroup_id"
          data={adgroups}
          placeholder="Search in adgroups"
          selectedData={selection}
          getOptionLabel={option => option.adgroup_name}
          getOptionSelected={(opt: any, value: any) => opt.adgroup_id === value.adgroup_id}
          getSelectedOptionValue={(opt: any) => opt}
          getCheckboxLabel={opt => opt.adgroup_name}
          onSelectValue={handleSelectChange}
          overrideClass={{
            autoComplete: classes.autoComplete
          }}
        />
      </fieldset>
    </form>
  );
}
