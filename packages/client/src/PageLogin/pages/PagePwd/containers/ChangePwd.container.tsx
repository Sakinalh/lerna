import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useEffect, useState } from "react";
import { FormState } from "src/model";
import { useNavigate } from "react-router-dom";
import PwdContainer from "./Pwd.container";
import { ChangePwdForm } from "../components/ChangePwdForm/ChangePwdForm.component";
import { PwdChanged } from "../components/PwdChanged/PwdChanged.component";

const useStyles = makeStyles({
  heading: {
    padding: "20px 0"
  },
  title: {
    fontSize: "1.1em",
    paddingBottom: 5
  }
});

type ReactEl = React.ComponentElement<any, any>;

interface ChangePwdContainerProps {
    purge: Function
}

export default function ChangePwdContainer({ purge }: ChangePwdContainerProps): JSX.Element {
  const classes = useStyles({});
  const [contentType, setContentType] = useState<"default" | "success">("default");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  function handleFormSubmitted(state: FormState) {
    if(state === "success") {
      setContentType("default");
    }
  }

  const content: Record<"default" | "success", ReactEl> = {
    default: <ChangePwdForm token={token!} onFormSubmitted={handleFormSubmitted}/>,
    success: <PwdChanged/>
  };

  return (
    <PwdContainer purge={purge}>
      <div className={classes.heading}>
        <Typography variant="h2" className={classes.title}>
          Change password
        </Typography>
      </div>
      {content[contentType]}
    </PwdContainer>
  );
}
