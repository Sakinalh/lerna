import React from "react";
import clsx from "clsx";
import { useStyles } from "./UploadModal.style";

export interface UploadModalContainerProps {
  header: any;
  footer: any;
  children: any;
}

export function UploadModalContainer(props: UploadModalContainerProps) {
  const { header = null, footer = null, children = null } = props;

  const classes = useStyles({});

  return (
    <div className={clsx(classes.root, "uploadModal", "container")}>
      <header className="uploadModal__header, container__header">
        {header}
      </header>
      <div className="uploadModal__body container__body">{children}</div>
      <footer className="uploadModal__footer container__footer">
        {footer}
      </footer>
    </div>
  );
}
