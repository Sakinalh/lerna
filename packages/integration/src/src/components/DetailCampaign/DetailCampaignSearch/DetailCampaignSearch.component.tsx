import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { PageCampaignInterface } from "src/PageGeneration/model";
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
    backgroundColor: "white",
    padding: 6
  },
  formLabel: {},
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "end"
  }
}));

interface DetailCampaignSearchProps {
    onSelect: Function;
    selection: PageCampaignInterface[];
}

export function DetailCampaignSearch({ onSelect, selection }: DetailCampaignSearchProps) {
  const classes = useStyles({});
  const campaigns: PageCampaignInterface[] = useSelector(
    (state: StoreState) =>
      state.ruleDetail.campaigns.list.results
  );

  function handleUpdateSelection(selection: PageCampaignInterface[]) {
    onSelect(selection);
  }

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
    >
      <fieldset className={classes.formGrp}>
        <AppAutoComplete<PageCampaignInterface>
          inputKey="selection__page_camp"
          keyProp="campaign_id"
          data={campaigns}
          placeholder="Search in campaigns"
          selectedData={selection}
          getOptionLabel={option => option.campaign_name}
          getOptionSelected={(opt: any, value: any) => opt.campaign_id === value.campaign_id}
          getSelectedOptionValue={(opt: any) => opt}
          getCheckboxLabel={opt => opt.campaign_name}
          onUpdateSelection={handleUpdateSelection}
          overrideClass={{
            autoComplete: classes.autoComplete
          }}
        />

      </fieldset>
    </form>
  );
}
