import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as TRANSLATE from "src/shared/translation/en.json";
import { BaseActionsModalProps } from "../../../model";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  }
});

interface FallbackActionsProps extends BaseActionsModalProps {
}

export function FallbackActions(props: FallbackActionsProps) {
  const { onClose } = props;
  const classes = useStyles({});

  return (
    <ModalActions title={TRANSLATE.shared.error} onClose={onClose}>
      <div className={classes.root}>
        <AppText text=" unkown id."/>

      </div>

    </ModalActions>

  );
}
