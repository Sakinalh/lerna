import { Outlet } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { tryGetTemplateDetail } from "src/PageGeneration/store/template.epic";
import { resetRuleDetailAction, tryGetRuleDetailAction } from "src/PageGeneration/store/rule.epic";
import { ErrorGenerationModal } from "../../components/shared/ErrorModal/ErrorModal.component";

/**
 * can't really use path match from react router as it needs the full pattern(all possible nested routes)
 * just easier to match it
 * @param path
 */
function matchTemplateId(path: string) {
  const regex = /\/template\/(.\d*?)\/rule/;
  const matched = regex.exec(path);
  if(Array.isArray(matched)) {
    return Number.isFinite(parseInt(matched[1], 10)) ? parseInt(matched[1], 10) : null;
  }

  return null;
}

function matchRuleId(path: string) {
  const editRegex = /\/rule\/(.\d*?)\/[a-z](?:\/(.*))?/;
  const editMatch = editRegex.exec(path);
  if(Array.isArray(editMatch)) {
    return Number.isFinite(parseInt(editMatch[1], 10)) ? parseInt(editMatch[1], 10) : null;
  }

  return null;
}

function matchRuleCreate(path: string) {
  const createRegex = /\/rule\/(.["create"]*)(?:\/(.*))?/;
  const createMatch = createRegex.exec(path);

  if(Array.isArray(createMatch)) {
    return createMatch[1];
  }

  return null;
}

interface TemplateRuleStepperProps {

}

/*
//READ ME
*  could be tempting to take the template zones-> then apply it rule.datum
    this way rule.datum is sole source of zones info. at runtime it's always formatted
    but in this case, 1. will return zones that are not been modified (aka all list, rather than selected subset)
    + 2. it will increase risk to fail rules validation

*  wrapper around template rule
* 1. will try to fetch template on valid template if
* 2. if the rule is create, reset the rule.datum
*   else it will fetch rule resource
*  this way rule. the data source for zones is always from rule.datum (Zones in template are just there to get the ids )
*
*
* */

export default function TemplateRuleStepper(_props: TemplateRuleStepperProps) {
  // const classes = useStyles({});

  const dispatch = useDispatch();

  // ESLint: React Hook useEffect has an unnecessary dependency: 'window.location.pathname'.
  // because mutating them doesn't re-render the component. (react-hooks/exhaustive-deps)
  // works if put it as var. whatever
  // re fetch template on nested page change
  const uri = window.location.pathname;
  useEffect(() => {
    // get template && set the template id on rule to add
    const templateId = matchTemplateId(uri);

    if(templateId === null) {
      // eslint-disable-next-line
      console.warn("failed to parse template id from. or regex failed", uri);
      //  history.back();
    } else {
      dispatch(tryGetTemplateDetail({ id: templateId as number }));
    }

    const ruleId = matchRuleId(uri);
    if(ruleId === null) {
      const isCreate = matchRuleCreate(uri) === "create";

      if(isCreate) {
        // clear any previous zones sta
        dispatch(resetRuleDetailAction(templateId as number));
      } else {
        // eslint-disable-next-line
        console.warn("invalid rule resource. neither id nor create or regex failed", matchRuleCreate(uri));
        //  history.back();
      }
    } else {
      dispatch(tryGetRuleDetailAction({ id: ruleId }));
    }
  }, [dispatch, uri]);

  return (
    <Fragment>
      <Outlet/>
      <ErrorGenerationModal/>
    </Fragment>
  );
}
