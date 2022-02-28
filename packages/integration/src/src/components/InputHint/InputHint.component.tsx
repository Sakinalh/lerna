import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { ErrorOutline } from "@mui/icons-material/";

const useStyles = makeStyles({
  root: {
    color: "red",
    fontSize: "inherit",
    marginBottom: 0,
    marginTop: 10,
    display: "none"
  },
  show: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: 5,
    fontSize: 15
  }
});

export interface InputInputProps {
    display: boolean;
    hint: string | null;
    inputKey: string;
}

export function InputHint(props: InputInputProps) {
  const classes = useStyles(props);
  const { display, hint, inputKey } = props;
  return (
    <span className={clsx(classes.root, {
      [classes.show]: display
    })
    }
    data-testid={inputKey}
    >
      <ErrorOutline className={classes.icon}/>
      {hint}
    </span>
  );
}
