import { MouseEvent as ReactMouseEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplatePageKdwApi } from "src/PageGeneration/model";
import { Button, FormControlLabel } from "src/deps";
import { patchSelectGeneratedAction } from "src/PageGeneration/store/generated.epic";
import { useDispatch } from "react-redux";
import * as TRANSLATE from "src/shared/translation/en.json";
import { OutlinedCheckboxCheckedIcon, OutlinedCheckboxIcon } from "src/PageGeneration/shared/style";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "30% 30% 20% 20%",
    color: "initial"
  },

  data: {
    paddingTop: 10
  },
  cell: {
    minHeight: 30,
    display: "flex",
    flexDirection: "column"
  },
  action_cell: {
    display: "flex",
    justifyContent: "flex-end"
  }

});

interface GeneratedRowSummaryProps {
    datum: TemplatePageKdwApi
}

export function GeneratedRowSummary({ datum }: GeneratedRowSummaryProps) {
  const classes = useStyles({});
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();

  function handleSelectPage(e: ReactMouseEvent<HTMLLabelElement>, id: string) {
    e.stopPropagation();
    const _update = datum.keywords.reduce((acc, curr) => ({ ...acc, ...{ [curr.keyword_id]: !select } }), {});
    dispatch(patchSelectGeneratedAction({ key: id, next: _update }));
    setSelect(!select);
  }

  function handleAction(e: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    e.stopPropagation();
  }

  return (

    <ul className={classes.root}>
      <li className={classes.row}>
        <div className={classes.cell}>
          <AppText text={TRANSLATE.shared.pageName}
            themeColor={"neutralColor"}
            capitalize="first"

          />

          <FormControlLabel
            aria-label="page selection"
            onClick={e => handleSelectPage(e, datum.page_id)}
            onFocus={event => event.stopPropagation()}
            control={<AppCheckbox whiteBg
              icon={<OutlinedCheckboxIcon size="md"/>}
              checkedIcon={<OutlinedCheckboxCheckedIcon size="md"/>}
              checked={select}/>}
            label={datum.page_name}
          />

        </div>
        <div className={classes.cell}>
          <AppText text={TRANSLATE.shared.kwd}
            themeColor="neutralColor"
            capitalize="first"
          />

          <AppText text={`${datum.keywords.length} keywords`}
            props={{ classes: { root: classes.data } }}
          />
        </div>
        <div className={classes.cell}>
          <AppText text={TRANSLATE.shared.messageMatch}
            themeColor="neutralColor"
            capitalize="first"

          />

          <AppText text={`${datum.keywords.length} match score`}
            props={{ classes: { root: classes.data } }}
          />
        </div>
        <div className={classes.action_cell}>
          <AppBtn
            color="secondary"
            onClick={handleAction}
            onFocus={event => event.stopPropagation()}
          >
            {TRANSLATE.shared.related}
          </AppBtn>

        </div>
      </li>
    </ul>

  );
}
