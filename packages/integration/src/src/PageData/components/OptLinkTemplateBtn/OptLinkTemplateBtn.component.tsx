import { MouseEvent as ReactMouseEvent } from "react";
import { AppText } from "src/components/AppText/AppText.component";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { StateActionSubmit } from "src/components/StateActionSubmit/StateActionSubmit.component";
import { useParams } from "react-router";
import { OptTemplateApi, StoreState } from "../../../model";
import { tryPostOptTemplateAction } from "../../store/optimizationEpic$";

const useStyles = makeStyles({
  content: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: "1.5em"
  }

});

interface OptLinkTemplateBtnProps {
    templateList: OptTemplateApi[];
}

const BTN_LABEL = {
  idle: "next",
  valid: "next",
  invalid: "next",
  pending: "processing",
  success: "next",
  error: "error",
  canceled: "canceled"
};

export function OptLinkTemplateBtn({ templateList }: OptLinkTemplateBtnProps) {
  const classes = useStyles({});
  const { formState } = useSelector((app: StoreState) => app.optimization.step);
  const dispatch = useDispatch();
  const { optId } = useParams();

  function handleSubmit(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if(optId) {
      dispatch(tryPostOptTemplateAction({
        optim_id: optId,
        template_page_pairs: templateList
      }));
    }
  }

  const validity = templateList.length > 0 ? "valid" : "disable";
  return (
    <StateActionSubmit
      formState={formState}
      disable={validity}
      onClick={handleSubmit}
    >
      <span className={classes.content}>
        <AppText text={BTN_LABEL[formState]}
          props={{
            variant: "caption"
          }}/>
      </span>

    </StateActionSubmit>

  );
}
