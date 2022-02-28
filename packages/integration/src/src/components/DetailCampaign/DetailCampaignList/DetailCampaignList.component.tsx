import { ChangeEvent as ReactChangeEvent, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel } from "src/deps";
import produce from "immer";
import {
  PageAdgroupInterface,
  PageCampaignInterface
} from "src/PageGeneration/model";
import {
  OutlinedCheckboxCheckedIcon,
  OutlinedCheckboxIcon
} from "src/PageGeneration/shared/style";
import {
  setAdgroupListAction,
  tryGetCampaignListAction
} from "src/PageGeneration/store/sem.epic";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";

const useStyles = makeStyles({
  root: {
    height: 200,
    padding: 30,
    overflowX: "auto"
  },
  label: {
    color: "black"
  }
});

function flattenAdgroups(payload: PageCampaignInterface[]) {
  return payload.reduce(
    (acc: PageAdgroupInterface[], curr: PageCampaignInterface) => [...acc, ...curr.adgroups],
    []
  );
}

interface DetailCampaignListProps {
  selection: PageCampaignInterface[];
  onSelect: Function;
}

export function DetailCampaignList({
  selection,
  onSelect
}: DetailCampaignListProps) {
  const classes = useStyles({});
  const campaigns: PageCampaignInterface[] = useSelector(
    (state: StoreState) => state.ruleDetail.campaigns.list.results
  );
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);

  const customerId = window.localStorage.getItem("naister_user_customer_id");

  useEffect(() => {
    // could optimize  by just calling the action when the list of campaign is empty
    dispatch(tryGetCampaignListAction(customerId));
  }, [dispatch, customerId]);
  useEffect(() => {
    if(campaigns.length === 0) {
      setSelectAll(false);
    }
  }, [dispatch, customerId, campaigns.length]);

  function handleSelectAll(event: ReactChangeEvent<HTMLInputElement>) {
    if(event.target.checked) {
      const _adgroupsOptions = flattenAdgroups(campaigns);
      const adgroupsOption = {
        count: _adgroupsOptions.length,
        results: _adgroupsOptions,
        next: null,
        previous: null
      };
      dispatch(setAdgroupListAction(adgroupsOption));
      onSelect(campaigns);
    } else {
      dispatch(
        setAdgroupListAction({
          count: 0,
          results: [],
          next: null,
          previous: null
        })
      );
      onSelect([]);
    }

    setSelectAll(event.target.checked);
  }

  function updateSelection(
    value: PageCampaignInterface,
    selection: PageCampaignInterface[]
  ) {
    const selectionPos = selection.findIndex(
      el => el.campaign_id === value.campaign_id
    );

    if(selectionPos < 0) {
      return produce(selection, (draftState: any[]) => {
        draftState.push(value);
      });
    } else {
      return produce(selection, (draftState: any[]) => {
        draftState.splice(selectionPos as number, 1);
      });
    }
  }

  function handleChange(adg: PageCampaignInterface) {
    const up = updateSelection(adg, selection);

    onSelect(up);
  }

  function isInList(list: PageCampaignInterface[]) {
    return (id: string) => Boolean(list.find(l => l.campaign_id === id));
  }

  const partIsInlist = isInList(selection);
  return (
    <ul className={classes.root}>
      <li>
        <FormControlLabel
          control={
            <AppCheckbox
              whiteBg
              checked={selectAll}
              onChange={handleSelectAll}
              name="select all"
              color="default"
            />
          }
          label={`Select all campaigns (${campaigns.length})`}
        />
      </li>
      {campaigns.map((cam, idx) => (
        <li key={`${cam.campaign_id}__${idx}`}>
          <FormControlLabel
              control={
                <AppCheckbox
                  whiteBg
                  checked={partIsInlist(cam.campaign_id)}
                  onChange={_e => handleChange(cam)}
                  name={cam.campaign_id}
                  color="default"

                />
              }
              classes={{
                label: classes.label
              }}
              label={"Campaign #" + (idx + 1) + ": " + cam.campaign_name}
            />
        </li>
      ))}
    </ul>
  );
}
