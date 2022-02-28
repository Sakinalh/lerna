import { MouseEvent as ReactMouseEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { PageKwdInterface } from "src/PageGeneration/model";
import { Button, FormControlLabel } from "src/deps";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { patchSelectGeneratedAction, tryDeleteGeneratedKwd } from "src/PageGeneration/store/generated.epic";
import * as TRANSLATE from "src/shared/translation/en.json";
import { OutlinedCheckboxCheckedIcon, OutlinedCheckboxIcon } from "src/PageGeneration/shared/style";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { GenerationCancelBtn } from "../../shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { GeneratedMoreActions } from "../GeneratedMoreActions/GeneratedMoreActions.component";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  cell: {
    minHeight: 30,
    display: "flex",
    alignItems: "center",
    "&:nth-child(3)": {
      justifyContent: "center",
      flexDirection: "column"
    }
  },
  head: {},
  list: {
    width: "100%"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "29% 23% 20% 26%",
    paddingBottom: 10,
    position: "relative",
    "&:after": {
      content: "\"\"",
      width: "75%",
      borderBottom: theme.palette.grey.light,
      position: "absolute",
      left: "25%",
      bottom: 0,
      height: 1
    }
  },
  score: {
    color: theme.palette.black
  }
}));

interface GeneratedRowDetailProps {
    data: PageKwdInterface[];
    pageId: string;
}

export function GeneratedRowDetail({ data, pageId }: GeneratedRowDetailProps) {
  const classes = useStyles({});
  const selection: Record<string, boolean> = useSelector(
    (state: StoreState) => state.pageGenerated.selectedKwd[pageId]
  );
  const dispatch = useDispatch();

  function handleSelectKwd(e: ReactMouseEvent<HTMLLabelElement>, id: number) {
    e.stopPropagation();

    const _update = {
      ...selection,
      [id]: !selection[id]
    };

    dispatch(patchSelectGeneratedAction({ key: pageId, next: _update }));
  }

  function deleteKwd(
    e: ReactMouseEvent<HTMLButtonElement | MouseEvent>,
    id: number
  ) {
    e.stopPropagation();

    dispatch(tryDeleteGeneratedKwd({ id }));
  }

  return (
    <ul className={classes.list}>
      {data.map(kw => (
        <li className={classes.row} key={kw.keyword_id}>
          <div/>

          <div className={classes.cell}>
            <FormControlLabel
                aria-label="keyword selection"
                onClick={e => handleSelectKwd(e, kw.keyword_id)}
                onFocus={event => event.stopPropagation()}
                control={<AppCheckbox whiteBg
                  icon={<OutlinedCheckboxIcon size="md"/>}
                  checkedIcon={<OutlinedCheckboxCheckedIcon size="md"/>}
                  checked={selection[kw.keyword_id]}/>}
                label={kw.keyword_name}
              />
          </div>
          <div className={classes.cell}>
            <AppText text={`${kw.naister_score}%`} themeColor="initial"/>
            <AppText text={`+ % ${TRANSLATE.shared.messageMatch}`} themeColor="initial"/>
          </div>
          <div className={classes.cell}>
            <AppBtn variant="contained" color="secondary">
              {TRANSLATE.btn.preview}
            </AppBtn>

            <GenerationCancelBtn
                onClick={ev =>
                  deleteKwd(ev, kw.keyword_id)}/>

            <GeneratedMoreActions
                datum={kw}
                pageId={pageId}/>
          </div>
        </li>
      ))}
    </ul>
  );
}
