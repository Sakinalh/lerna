import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { BaseTextRule } from "src/PageGeneration/model";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    gridColumnGap: 40
  },
  preview_wrap: {
    paddingTop: 10
  },
  preview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    border: `dashed 1px ${theme.palette.grey.light}`,
    width: 253,
    padding: "10px 0",
    margin: "10px 0"
  },
  text: {
    opacity: 0.4
  },
  preview_info: {
    paddingTop: 10
  },
  aside: {
    display: "grid"
  },
  box: {
    border: "1px solid",
    height: 20,
    width: 60
  },
  hide: {
    opacity: 0
  }
}));

interface RecapTxtAreaProps {
    datum: BaseTextRule
}

export function RecapTxtArea({ datum }: RecapTxtAreaProps): JSX.Element {
  const classes = useStyles({});
  return (
    <ul className={classes.root}>
      <li className={classes.preview_wrap}>
        <AppText text='Preview'
          themeColor="neutralColor"
        />
        <div className={classes.preview}>
          <AppText text={datum.text_template}
            props={{ variant: "caption" }}
            themeColor="initial"
          />
          <AppText text={datum.default_value.toString()}
            props={{ classes: { root: classes.text } }}/>
        </div>
      </li>
      <li className={classes.preview_info}>
        <AppText text='Text length'
          themeColor="initial"
          props={{ variant: "caption" }}
        />
        <AppText text={datum.text_max_length.toString()}
          props={{ classes: { root: classes.text } }}/>
      </li>
    </ul>
  );
}
