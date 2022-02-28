import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { IconButton } from "src/deps";
import { Close } from "@mui/icons-material";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 15px",
    backgroundColor: theme.palette.blue.dark,
    color: theme.palette.white
  }
}));

interface InterpreterModalHeaderProps {
    onClose: Function,
    title: string,
}

export function InterpreterModalHeader(props: InterpreterModalHeaderProps) {
  const { onClose, title } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <AppText text={title} props={{ variant: "caption" }}/>
      <IconButton onClick={ev => onClose(ev)}
        size="small"
        color="inherit"
        aria-label="close actions modal">
        <Close fontSize="small"/>
      </IconButton>
    </div>
  );
}
