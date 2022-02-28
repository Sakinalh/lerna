import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { ListCellText } from "../ListCellText/ListCellText.component";
import { ListCellDate } from "../ListCellDate/ListCellDate.component";
import { SourceListAction } from "../SourceListAction/SourceListAction.component";
import { SourceCheckboxAction } from "../SourceCheckboxAction/SourceCheckboxAction.component";
import { ListCellUser } from "../LIstCellUser/ListCellUser.component";
import { AppText } from "../../../../../../components/AppText/AppText.component";

const useStyles = makeStyles({

  head: {
    height: 30,
    display: "block"
  },
  content: {
    height: 40,
    display: "flex",
    alignItems: "center"
  }

});

export type ListCellType = "text" | "date" | "sourceAction" | "sourceCheckbox" | "user";

function setCompName(type: ListCellType) {
  const MAP_ACTION: Record<ListCellType, Function> = {
    text: ListCellText,
    date: ListCellDate,
    user: ListCellUser,
    sourceAction: SourceListAction,
    sourceCheckbox: SourceCheckboxAction
  };

  return MAP_ACTION.hasOwnProperty(type) ? MAP_ACTION[type] : MAP_ACTION.text;
}

interface VariableSourceListColProps<T> {
    colName: string;
    data: T[];
    renderProps: {
        type: ListCellType;
        path: string[];
        overrideStyle?: Object;
    },
    overrideStyle?: Object;
}

export function VariableSourceListCol<T>(props: VariableSourceListColProps<T>) {
  const classes = useStyles(props);
  const { data, colName, renderProps, overrideStyle = {} } = props;

  const CellContent = setCompName(renderProps.type);
  return (
    <ul>
      <li className={clsx(classes.head, overrideStyle)}>
        <AppText text={colName}
          capitalize="first"

        />
      </li>
      {
        data.map((datum, idx) => <li key={`${colName}__${idx}`}
            className={classes.content}>
          <CellContent<T> datum={datum}
              path={renderProps.path}
              overrideStyle={renderProps.overrideStyle}
            />
        </li>)
      }
    </ul>
  );
}
