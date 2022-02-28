import { ChangeEvent as ReactChangeEvent, useEffect, useRef, useState } from "react";
import { StoreState } from "src/model";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Radio, RadioGroup } from "src/deps";
import { tryGetZoneProposalAction } from "src/PageGeneration/store/rule.epic";
import clsx from "clsx";
import { AppText } from "src/components/AppText/AppText.component";
import { TemplatePageRuleListApi, TemplateZoneApi } from "src/PageGeneration/model";
import { getSelectedZone } from "../QueueAreaEditModal/shared";
import { ProposalItem } from "../ProposalItem/ProposalItem.component";

const useStyles = makeStyles({
  root: {},
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gridColumnGap: 15,
    gridRowGap: 15,
    alignItems: "flex-start"
  },
  form: {
    flexWrap: "inherit",
    paddingTop: 10
  },
  text: {
    display: "grid",
    gridTemplateColumns: "25% 75%"
  },
  item: {
    display: "flex",
    padding: "5px 8px",
    alignItems: "flex-start",
    height: "100%"
  },

  radio: {
    display: "flex",
    flexDirection: "column",
    marginRight: "inherit"
  },
  selected: {}
});

export interface ProposalListDetailProps {
    ids: { rowId: number, pageId: string; zoneId: string; };
    handleChange: (value: any) => void;
    keywordId: number;
}

export function ProposalListDetail({ handleChange, ids: { rowId, pageId, zoneId }, keywordId }: ProposalListDetailProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const zone = useSelector((state: StoreState) => state.pageQueue.proposals.list.results);

  const list: TemplatePageRuleListApi[] = useSelector((state: StoreState) => state.pageQueue.list.results);
  const listInstance = useRef<TemplatePageRuleListApi[]>(list);

  listInstance.current = list;

  const defaultZone = zone[0];
  // could (should be using ?) the zone id, as default value.
  // better wait for the get the actual data
  const [selectedZone, setSelectedZone] = useState<{ id: string, value: null | TemplateZoneApi }>({
    id: "",
    value: null
  });
  useEffect(() => {
    const userSelection = getSelectedZone({ ruleId: rowId, pageId, zoneId, keywordId }, listInstance.current);

    dispatch(tryGetZoneProposalAction({ rule_id: rowId, page_id: pageId, zone_id: zoneId, userSelection }));
  }, [rowId, pageId, zoneId, keywordId, dispatch]);

  useEffect(() => {
    if(defaultZone) {
      setSelectedZone({ id: defaultZone.zone_id, value: defaultZone as TemplateZoneApi });
    }
  }, [defaultZone]);

  useEffect(() => {
    if(selectedZone.value) {
      handleChange(selectedZone.value);
    }
  }, [selectedZone.value, handleChange]);

  function handleChangeValue(ev: ReactChangeEvent<HTMLInputElement>) {
    const id = ev.target.value;
    const value = zone.find(z => z.zone_id === id);
    setSelectedZone({ id, value });
  }

  return (
    <form>
      <div className={classes.text}>
        <AppText text="Product selected"
          themeColor="neutralColor"/>
        <AppText text="Other products that may interest you"
          themeColor="neutralColor"/>
      </div>
      <RadioGroup value={selectedZone.id}
        onChange={handleChangeValue}
        classes={{ root: classes.form }}>
        <ul className={classes.list}
        >
          {
            zone.map((d, idx: number) => (
              <li key={`zone_${idx}`}
                className={clsx(
                  classes.item,
                  { [classes.selected]: zoneId === d.zone_id }
                )
                }>
                <FormControlLabel value={d.zone_id}
                  control={<Radio size="small"/>}
                  label=""
                  classes={{ root: classes.radio }}/>
                <ProposalItem datum={d}
                  maxHeight={80}
                />
              </li>
            ))
          }

        </ul>
      </RadioGroup>

    </form>

  );
}
