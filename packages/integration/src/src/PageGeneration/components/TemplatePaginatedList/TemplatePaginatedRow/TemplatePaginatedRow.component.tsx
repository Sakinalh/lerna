import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { ViewCompact } from "@mui/icons-material";
import { TemplateListItemApi } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtnLink } from "src/components/AppBtnLink/AppBtnLink.component";
import clsx from "clsx";
import { TemplateActionBtn } from "../../TemplateActionBtn/TemplateActionBtn.component";
import { TemplateCellSelectActions } from "../../TemplateCellSelectActions/TemplateCellSelectActions.component";
const useStyles = makeStyles(theme => ({
  root: {
    padding: "15px 0"
  },
  content: {
    backgroundColor: theme.palette.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "35px",
    border: "1px solid rgba(216,216,216,0.5)",
    boxShadow: "0 1px 15px 0 rgba(0,0,0,0.05)"
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.grey.dark,
    justifyContent: "space-between",
    minHeight: 51
  },
  center: {
    justifyContent: "center"
  },
  icon: {
    opacity: 0.5,
    transform: "scaleX(-1)"
  },
  tagList: {},
  tag: {
    display: "inline-block",
    color: "black"
  },
  label: {
    paddingBottom: 7
  },
  text: {
  },
  actions: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > *": {
      marginRight: 5,
      "&:last-child": {
        marginRight: 0
      }
    }
  },
  btn: {
    width: "100%",
    backgroundColor: theme.palette.blue.main,
    color: theme.palette.white
  }
}));

function _setLink(templateId: string) {
  return (ruleId: string | null) => {
    if(ruleId) {
      return {
        path: `/generation/template/${templateId}/rule/${ruleId}/edit/`,
        btnLabel: TRANSLATE.btn.edit
      };
    }

    return {
      path: `/generation/template/${templateId}/rule/create/`,
      btnLabel: TRANSLATE.btn.create
    };
  };
}

interface TemplatePaginatedRowProps {
  datum: TemplateListItemApi;
}

export function TemplatePaginatedRow(props: TemplatePaginatedRowProps) {
  const classes = useStyles({});
  const { datum } = props;
  const partSetLink = _setLink(datum.id.toString());
  const [detailLink, setDetailLink] = useState<{
    path: string;
    btnLabel: string;
  }>(partSetLink(null));

  const [selectedRuleId, setSelectedId] = useState<number | null>(null);

  function handleSelect(ruleId: number) {
    if(ruleId) {
      setDetailLink(partSetLink(ruleId.toString()));
      setSelectedId(ruleId);
    } else {
      setSelectedId(null);
      setDetailLink(partSetLink(null));
    }
  }

  return (
    <li className={classes.root}>
      <article className={classes.content}>
        <div className={clsx(classes.cell, classes.center)}>
          <ViewCompact classes={{ root: classes.icon }} />
        </div>
        <div className={classes.cell}>
          <AppText
            capitalize="first"
            props={{
              variant: "caption",
              classes: { root: classes.label }
            }}
            text={TRANSLATE.shared.templateName}
          />
          <AppText
            capitalize="first"
            themeColor="initial"
            props={{
              classes: { root: classes.text }
            }}
            text={datum.name}
          />
        </div>
        <div className={classes.cell}>
          <AppText
            capitalize="first"
            props={{
              variant: "caption",
              classes: { root: classes.label }
            }}
            text={TRANSLATE.shared.tags}
          />
          <ul className={classes.tagList}>
            {/*
                        {datum.zones.map((t, idx) => <li className={classes.tag} key={`${idx}`}>{t} ,</li>)}
*/}
          </ul>
        </div>
        <div className={classes.cell}>
          <AppText
            capitalize="first"
            props={{
              variant: "caption",
              classes: { root: classes.label }
            }}
            text={TRANSLATE.generationRules}
          />
          <div className={classes.actions}>
            <TemplateCellSelectActions
              data={datum.rules}
              onSelect={handleSelect}
            />
            <AppBtnLink
              overrideClasses={classes.btn}
              label={detailLink.btnLabel}
              uri={detailLink.path}
            />
          </div>
        </div>

        <div className={classes.cell}>
          <TemplateActionBtn
            templateId={datum.id}
            selectedRuleId={selectedRuleId}
            onDelete={handleSelect}
          />
        </div>
      </article>
    </li>
  );
}
