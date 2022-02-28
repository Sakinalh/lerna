import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { ViewQuilt } from "@mui/icons-material";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppBtnLink } from "../../../../components/AppBtnLink/AppBtnLink.component";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  block_title: {
    margin: "10px 0",
    fontSize: "1.167em"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "90px 65% 20%",
    alignItems: "center",
    border: heme.shape.border.solidGrey,
    borderRadius: 5,
    padding: "20px 0"
  },
  icon: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 30,
    color: theme.palette.grey.dark,
    opacity: "50%"
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: 15
  },
  hide: {
    opacity: 0,
    pointerEvents: "none"
  },
  label: {
    opacity: 0.8,
    paddingBottom: 5
  },
  name: {
    color: "initial"
  },
  titles: {
    paddingLeft: 50
  },
  btnPreview: {
    textDecoration: "underline",
    border: "none"
  }
}));

interface TemplateStepperProps {
    nameValue: string;
    label: string;
    editLink: string;
    previewUrl?: string;
    overrideClasses?: Object;
}

export function TemplateStepper(
  { nameValue, editLink, previewUrl = "", label = "name", overrideClasses = {} }: TemplateStepperProps
) {
  const classes = useStyles({});

  return (
    <article className={clsx(classes.root, overrideClasses)}>

      <AppText text={TRANSLATE.shared.pageInfo}
        themeColor="neutralColor"
        props={{ classes: { root: classes.block_title } }}
      />
      <ul className={classes.content}>
        <li className={classes.icon}>
          <ViewQuilt classes={{ root: classes.icon }}/>
        </li>
        <li className={classes.titles}>
          <AppText text={label}
            themeColor="neutralColor"
            capitalize="first"
            props={{
              classes: { root: classes.label },
              variant: "caption"
            }}
          />
          <AppText text={nameValue}
            themeColor="initial"
            capitalize="first"
          />
        </li>

        <li className={classes.actions}>

          <AppBtnLink uri={previewUrl}
            overrideClasses={clsx(previewUrl.length === 0 ? classes.hide : {}, classes.btnPreview)}
            label={TRANSLATE.btn.preview}/>
          <AppBtnLink uri={editLink}
            label={TRANSLATE.btn.edit}/>

        </li>
      </ul>

    </article>
  );
}
