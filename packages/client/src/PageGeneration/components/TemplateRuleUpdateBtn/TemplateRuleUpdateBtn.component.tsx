import { MouseEvent as ReactMouseEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Button } from "src/deps";
import * as TRANSLATE from "src/shared/translation/en.json";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { tryPatchRuleDetailAction } from "../../store/rule.epic";
import { parsePathRouteParams } from "../../../shared/utils";

const useStyles = makeStyles(theme => ({
  btn: {
    marginTop: 30,
    width: "100%",
    borderRadius: theme.shape.border.radiusMin
  }
}));

interface TemplateRuleUpdateBtnProps {
}

export function TemplateRuleUpdateBtn(_props: TemplateRuleUpdateBtnProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const { rule: { datum: { keywords, name } } } = useSelector((state: StoreState) => state.ruleDetail);
  const {
    params: {
      ruleId,
      templateId
    }
  } = parsePathRouteParams(window.location.pathname, "generation/template/:templateId/rule/:ruleId/keywords/");

  function updateTemplateRule(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    /* on keywords patch, go to newt route: recap */
    dispatch(tryPatchRuleDetailAction({
      datum: { keywords, template_id: templateId, name },
      id: ruleId
    }));
  }

  return (

    <AppBtn onClick={updateTemplateRule}
      color="secondary"
      classes={{ root: classes.btn }}
      variant="contained">
      {TRANSLATE.btn.checkInformation}
    </AppBtn>

  );
}
