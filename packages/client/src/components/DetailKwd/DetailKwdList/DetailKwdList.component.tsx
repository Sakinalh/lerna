import { ChangeEvent as ReactChangeEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { PageKwdInterfaceView, RuleKeyword } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import clsx from "clsx";
import { AppText } from "src/components/AppText/AppText.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "30px 0",
    overflowX: "auto",
    maxHeight: 200,
    textTransform: "capitalize"
  },
  row: {
    width: "100%",
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "10% 50% 20% 20%",
    borderBottom: theme.shape.border.solidGrey,
    "&:first-child": {
      paddingBottom: 10
    }
  },
  table: {
    color: theme.palette.grey.middle1
  },
  lastCell: {
    textAlign: "center"
  }
}));

interface DetailKwdListProps {
  selection: RuleKeyword[];
  // persist the selection outside local state
  onSelectValue: (sel: PageKwdInterfaceView) => void;
}

export function DetailKwdList({
  selection,
  onSelectValue
}: DetailKwdListProps) {
  const classes = useStyles({});
  const keywords: PageKwdInterfaceView[] = useSelector(
    (state: StoreState) => state.ruleDetail.keywords.list.results
  );

  function handleChange(
    ev: ReactChangeEvent<HTMLInputElement>,
    kwd: PageKwdInterfaceView
  ) {
    ev.stopPropagation();
    ev.preventDefault();

    onSelectValue(kwd);
  }

  function isInList(list: RuleKeyword[]) {
    return (id: number) => Boolean(list.find(l => l.id === id));
  }

  const partIsInlist = isInList(selection);

  return (
    <ul className={classes.root}>
      <li className={classes.row}>
        <div />
        <AppText text={TRANSLATE.shared.kwd} />
        <AppText
          text={TRANSLATE.shared.bounce}
          props={{ classes: { root: classes.lastCell } }}
        />
        <AppText
          text={TRANSLATE.shared.messageMatch}
          props={{ classes: { root: classes.lastCell } }}
        />
      </li>
      {keywords.map((kwd, idx) => (
        <li
            key={`${kwd.keyword_id}__${idx}`}
            className={clsx(classes.row, classes.table)}
          >
          <AppCheckbox
              whiteBg
              checked={partIsInlist(kwd.keyword_id)}
              onChange={ev => handleChange(ev, kwd)}
              name={kwd.keyword_name}
              color="default"

            />
          <AppText text={kwd.keyword_name} />
          <AppText
              text={kwd.mean_cpc}
              props={{ classes: { root: classes.lastCell } }}
            />
          <AppText
              text={kwd.naister_score}
              props={{ classes: { root: classes.lastCell } }}
            />
        </li>
      ))}
    </ul>
  );
}
