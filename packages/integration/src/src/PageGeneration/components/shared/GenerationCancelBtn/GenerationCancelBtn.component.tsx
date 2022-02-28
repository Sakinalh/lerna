import makeStyles from "@mui/styles/makeStyles";
import { Button } from "src/deps";

import * as TRANSLATE from "src/shared/translation/en.json";
import { ButtonBaseTypeMap, ExtendButtonBase } from "@mui/material/ButtonBase/ButtonBase";
import clsx from "clsx";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.red.main,
    maxHeight: 50// limit the ripple height
  },
  dismiss: {
    textDecoration: "underline",
    display: "inline-block",
    "&:first-letter": {
      textTransform: "capitalize"
    }
  }
}));

export interface GenerationCancelBtnProps {
    customStyle?: {
        root?: Object;
        label?: Object;
    };
    onClick: (ev) => void;
    props?: ExtendButtonBase<ButtonBaseTypeMap> | {};
    label?: string;

}

export function GenerationCancelBtn({
  onClick,
  customStyle = { root: {}, label: {} },
  props = {},
  label = TRANSLATE.btn.cancel
}: GenerationCancelBtnProps) {
  const classes = useStyles({});

  return (

    <AppBtn size="small"
      classes={{
        root: clsx(classes.root, customStyle.root),
        label: clsx(classes.dismiss, customStyle.label)
      }}
      onClick={onClick}
      {...props as ExtendButtonBase<ButtonBaseTypeMap>}
    >
      {label}
    </AppBtn>
  );
}
