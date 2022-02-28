import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useState } from "react";
import { ResetForm } from "src/PageLogin/pages/PagePwd/components/ResetForm/ResetForm.component";
import { FormState } from "src/model";
import { AppText } from "src/components/AppText/AppText.component";
import { ResetSent } from "../components/ResetSent/ResetSent.component";
import PwdContainer from "./Pwd.container";

const useStyles = makeStyles({
  heading: {
    padding: "20px 0"
  }
});

type ReactEl = React.ComponentElement<any, any>;

interface ResetPwdContainerProps {
    purge: Function;
}

export default function ResetPwdContainer({ purge }: ResetPwdContainerProps): JSX.Element {
  const classes = useStyles({});
  const [contentType, setContentType] = useState<"default" | "success">("default");

  function handleFormSubmitted(state: FormState) {
    if(state === "success") {
      setContentType("success");
    }
  }

  const content: Record<"default" | "success", ReactEl> = {
    default: <ResetForm onFormSubmitted={handleFormSubmitted}/>,
    success: <ResetSent/>
  };

  return (
    <PwdContainer purge={purge}>
      <div className={classes.heading}>
        <AppText text="reset password" capitalize="all"/>
      </div>
      {content[contentType]}
    </PwdContainer>
  );
}
