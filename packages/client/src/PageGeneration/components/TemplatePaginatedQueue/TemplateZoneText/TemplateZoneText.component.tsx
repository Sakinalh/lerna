import * as React from "react";
import { Fragment, MouseEvent as ReactMouseEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { ExtendedTemplateZoneApi } from "src/PageGeneration/model";
import { Button, Modal } from "src/deps";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { renderModalContent } from "../QueueAreaEditModal/render";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: "inherit"
  },

  item: {
    overflow: "auto",
    height: "100%",
    display: "grid",
    alignItems: "flex-end",
    gridTemplateRows: "60% 20%"
  },
  text: {
    paddingTop: 5,
    maxHeight: "80%",
    fontSize: 10,
    overflow: "hidden"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export function TemplateZoneText({
  zone,
  rowId,
  pageId
}: { zone: ExtendedTemplateZoneApi, rowId: number; pageId: string }) {
  const classes = useStyles({});
  const [edit, setEdit] = useState(false);

  // do not use redux to handle modal close. it will rerender the whole list for some reason
  // use ugly prop drill

  function handleModalToggle(next: boolean) {
    setEdit(next);
  }

  function handleOnClose(ev ?: ReactMouseEvent<HTMLButtonElement | MouseEvent>) {
    if(ev) {
      ev.preventDefault();
    }

    setEdit(false);
  }

  return (
    <article className={classes.root}>
      <div className={classes.item}>
        <AppText text={zone.content}
          themeColor="initial"
          capitalize="first"
          props={{
            classes: { root: classes.text },
            variant: "caption"
          }}
        />
        <AppBtn size="small"
          color="secondary"
          onClick={_e => handleModalToggle(true)}>
          {TRANSLATE.btn.edit}
        </AppBtn>
      </div>
      <Modal
        open={Boolean(edit)}
        onClose={handleOnClose as any}
        aria-labelledby="interpreter-actions"
        aria-describedby="interpreter-actions-on-template"
        className={classes.modal}
      >
        <ModalActions title={TRANSLATE.modal.areaEdition}
            onClose={handleOnClose}>
          {renderModalContent(
            {
              pageId,
              rowId,
              zoneId: zone.id,
              parentZoneId: zone._parentZoneId
            },
            zone.type,
            handleOnClose,
            zone.keyword_id
          )}

        </ModalActions>

      </Modal>
    </article>

  );
}
