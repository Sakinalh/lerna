import React from "react";
import clsx from "clsx";
import { AppTag } from "src/components/AppTag/AppTag.component";
import {useStyles} from "./CardImg.style";

export interface CardImgProps {
  header ?: boolean
  content ?: boolean
  footer ?: boolean
  isSelected ?: boolean
  tag ?: boolean
  pct ?: number
  src ?: string
  actions ?: React.ReactNode
  children?: React.ReactNode
  isCursor ?: boolean
  onlyImg ?: boolean

}

export function CardImg(props: CardImgProps) {
  const {
    isSelected = false,
    header = true,
    content = true,
    footer = true,
    isCursor = false,
    tag = true,
    pct = 0,
    src="https://via.placeholder.com/250x142",
    actions = null,
    children = null,
    onlyImg = false
  } = props;

  const classes = useStyles({});

  return (
    <div className={clsx(classes.root, "cardImg", { "isSelected": isSelected }, { "isCursor": isCursor }, { "onlyImg": onlyImg })}>
      {header &&
      <header className="cardImg__header">
        {tag &&
        <AppTag customclass="cardImg__tag" stateColor="more">
          {`${pct} %`}
        </AppTag>
      }
        <img alt="cardImg" className="cardImg__img" src={src} />
      </header>
  }
      {content &&
      <div className="cardImg__body">
        {children}
      </div>
  }
      {footer &&
      <footer className="cardImg__footer">
        {actions}
      </footer>
  }
    </div>);
}
