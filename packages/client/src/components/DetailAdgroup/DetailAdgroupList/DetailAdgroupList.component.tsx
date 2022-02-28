import * as React from "react";
import { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { PageAdgroupInterface } from "src/PageGeneration/model";
import { FormControlLabel } from "src/deps";
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

export interface DetailAdgroupListProps {
  selection: PageAdgroupInterface[];
  onSelect: Function;
  onSetAll: Function;
}

export function DetailAdgroupList({
  selection,
  onSelect,
  onSetAll
}: DetailAdgroupListProps) {
  const classes = useStyles({});
  const adgroups: PageAdgroupInterface[] = useSelector(
    (state: StoreState) => state.ruleDetail.adgroups.list.results
  );

  const [selectAll, setSelectAll] = React.useState(false);

  useEffect(() => {
    if(adgroups.length === 0) {
      setSelectAll(false);
    }
  }, [adgroups.length]);

  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.checked) {
      onSetAll(adgroups);
    } else {
      onSetAll([]);
    }

    setSelectAll(event.target.checked);
  }

  function updateSelection(
    value: PageAdgroupInterface,
    selection: PageAdgroupInterface[]
  ) {
    const selectionPos = selection.findIndex(
      el => el.adgroup_id === value.adgroup_id
    );

    if(selectionPos < 0) {
      return { action: "ADD", value };
    } else {
      return { action: "REMOVE", value };
    }
  }

  function handleChange(adg: PageAdgroupInterface) {
    const up = updateSelection(adg, selection);

    onSelect(up);
  }

  function isInList(list: PageAdgroupInterface[]) {
    return (id: string) => Boolean(list.find(l => l.adgroup_id === id));
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
          label={`Select all adgroups (${adgroups.length})`}
        />
      </li>
      {adgroups.map((ad, idx) => (
        <li key={`${ad.adgroup_id}__${idx}`}>
          <FormControlLabel
              control={
                <AppCheckbox
                  whiteBg
                  checked={partIsInlist(ad.adgroup_id)}
                  onChange={_e => handleChange(ad)}
                  name={ad.adgroup_id}
                  color="default"

                />
              }
              classes={{
                label: classes.label
              }}
              label={"Adgroup #" + (idx + 1) + ": " + ad.adgroup_name}
            />
        </li>
      ))}
    </ul>
  );
}
