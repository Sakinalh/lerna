import { Fragment, MouseEvent as ReactMouseEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { ExtendedTemplateZoneApi } from "src/PageGeneration/model";
import { Modal } from "src/deps";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { ProposalImg } from "../ProposalImg/ProposalImg.component";
import { renderModalContent } from "../QueueAreaEditModal/render";

const useStyles = makeStyles(theme => ({

  img_wrap: {
    width: 80,
    height: 80,
    alignItems: "center"
  },
  img_cell: {},
  btn: {
    color: theme.palette.blue.main
  },
  img: {
    height: "auto",
    maxWidth: "100%",
    maxHeight: "70%"
  },

  edit_img_wrap: {
    overflow: "hidden",
    width: "80%",
    height: 60
  },
  cell_content: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "60% 20%",
    alignItems: "flex-end"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

interface TemplateZoneImgProps {
    zone: ExtendedTemplateZoneApi;
    pageId: string;
    rowId: number;

}

export function TemplateZoneImg({ zone, pageId, rowId }: TemplateZoneImgProps) {
  const classes = useStyles({});
  const [edit, setEdit] = useState(false);

  // do not use redux to handle modal close. it will rerender the whole list for some reason
  // use ugly prop drill

  function handleModalToggle(next: boolean) {
    setEdit(next);
  }

  function handleCloseModal(ev ?: ReactMouseEvent<HTMLButtonElement | MouseEvent>) {
    if(ev) {
      ev.preventDefault();
    }

    setEdit(false);
  }

  return (
    <article className={classes.cell_content}>

      <div className={classes.edit_img_wrap}>
        <ProposalImg
          src={zone.content}
          alt={zone.content}/>
      </div>

      <AppBtn size="small"
        color="secondary"
        classes={{ root: classes.btn }}
        onClick={_e => handleModalToggle(true)}>
        {TRANSLATE.btn.edit}
      </AppBtn>

      <Modal
        open={Boolean(edit)}
        onClose={handleCloseModal as any}
        aria-labelledby="interpreter-actions"
        aria-describedby="interpreter-actions-on-template"
        className={classes.modal}
      >
        <ModalActions title={TRANSLATE.modal.areaEdition}
            onClose={handleCloseModal}>
          {renderModalContent(
            {
              pageId,
              rowId,
              zoneId: zone.id,
              parentZoneId: zone._parentZoneId
            },
            zone.type,
            handleCloseModal,
            zone.keyword_id
          )

            }

        </ModalActions>

      </Modal>
    </article>

  );
}
