import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { IconButton } from "src/deps";
import { CloseOutlined } from "@mui/icons-material";
import { safeGet } from "src/shared/utils";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 12,
    color: theme.palette.grey.dark
  },
  title: {
    textTransform: "uppercase"
  },
  dashed: {
    display: "flex",
    border: `dashed 1px ${theme.palette.grey.light}`,
    borderRadius: 3,
    flexWrap: "wrap",
    padding: "10px 15px",
    margin: "10px 0",
    gap: "8px"
  },
  toolTip: {
    backgroundColor: theme.palette.grey.light,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    margin: 5
  },
  text: {
    fontWeight: "lighter",
    padding: 2
  },
  iconBtn: {
    padding: 5
  },
  icon: {
    fontSize: 12,
    color: "#919191"
  },
  tailAction: {
    display: "none"
  },
  show: {
    display: "block"
  },
  btn: {
    display: "block",
    textTransform: "uppercase",
    fontSize: "0.9em"
  },
  btnLabel: {
    display: "flex",
    alignItems: "center"
  }
}));

interface ActionTagListProps<T> {
    title: string;
    data: T[];
    labelPath: string[];
    hasTailAction?: boolean;
    onAction: Function;
}

export function ActionTagList<T>({
  data,
  labelPath,
  title,
  onAction
}: ActionTagListProps<T>): JSX.Element {
  const classes = useStyles({});
  return (
    <div className={classes.root}>

      <AppText text={title} capitalize="uppercase"/>

      <ul className={classes.dashed}>
        {
          data.map((datum, idx) => <li className={classes.toolTip} key={`${title}__${idx}`}>
            <AppText themeColor="initial"
              text={safeGet(datum, ...labelPath)}
              props={{ classes: { root: classes.text } }}/>
            <IconButton
              classes={{ root: classes.iconBtn }}
              onClick={_e => onAction(datum)}
              size="large">
              <CloseOutlined classes={{ root: classes.icon }}/>
            </IconButton>

          </li>)
        }

      </ul>
    </div>
  );
}
