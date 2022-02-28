import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { InterpreterModalHeader } from "../../InterpreterTools/InterpreterModalHeader/InterpreterModalHeader.component";

const useStyles = makeStyles({
  root: {
    fontSize: 12,
    width: 750,
    overflowY: "auto"
  }

});

interface ModalActionsProps {
    onClose: Function;
    title: string;
    children: React.ReactElement;
    override?: Object;
}

export function ModalActions(props: ModalActionsProps) {
  const classes = useStyles(props);
  const { onClose, title, children, override } = props;
  return (

    <section className={clsx(classes.root, override)}>
      <InterpreterModalHeader title={title}
        onClose={onClose}/>
      {children}

    </section>

  );
}
