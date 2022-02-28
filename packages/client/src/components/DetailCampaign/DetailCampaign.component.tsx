import * as React from "react";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { PageAdgroupInterface, PageCampaignInterface } from "src/PageGeneration/model";
import { useDispatch } from "react-redux";
import { AppText } from "src/components/AppText/AppText.component";
import { setAdgroupListAction } from "src/PageGeneration/store/sem.epic";
import { DetailCampaignList } from "./DetailCampaignList/DetailCampaignList.component";
import { DetailCampaignSearch } from "./DetailCampaignSearch/DetailCampaignSearch.component";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingBottom: 10
  },
  block: {
    marginTop: 10,
    outline: theme.shape.border.solidGrey
  }
}));

function flattenAdgroups(payload: PageCampaignInterface[]) {
  return payload.reduce((acc: PageAdgroupInterface[], curr: PageCampaignInterface) => [...acc, ...curr.adgroups], []);
}

interface DetailCampaignProps {
    // persist the selection outside local state
    onSelect?: (selection: PageCampaignInterface[]) => void;
    nextState?: "reset" | "idle";
}

export function DetailCampaign({ onSelect = payload => payload, nextState = "idle" }: DetailCampaignProps) {
  const classes = useStyles({});

  const [next, setNext] = useState<{ selection: PageCampaignInterface[]; }>({
    selection: []
  });
  useEffect(() => {
    if(nextState === "reset") {
      setNext(_s => ({ selection: [] }));
    }
  }, [nextState]);
  const dispatch = useDispatch();

  function handleSelect(payload: PageCampaignInterface[]) {
    const _adgroupsOptions = flattenAdgroups(payload);
    const adgroupsOption = {
      count: _adgroupsOptions.length,
      results: _adgroupsOptions,
      next: null,
      previous: null
    };
    dispatch(setAdgroupListAction(adgroupsOption));
    onSelect(payload);
    setNext({ selection: payload });
  }
  return (
    <section className={classes.root}>
      <AppText text={`Campaigns (${next.selection.length})`}/>
      <div className={classes.block}>
        <DetailCampaignSearch
          selection={next.selection}
          onSelect={handleSelect}/>
        <DetailCampaignList
          selection={next.selection}
          onSelect={handleSelect}
        />
      </div>
    </section>
  );
}
