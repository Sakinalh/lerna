// style
import * as React from "react";
import { useEffect, useState } from "react";
// Model
import { AuthPayload, FormState, UseAuthPayload } from "src/model/index";
// components
// hooks
import { PageTheme } from "src/containers/PageTheme/PageTheme.container";
import makeStyles from "@mui/styles/makeStyles";
import { persistor } from "src/index";
import { useTryAuth, useValidationError } from "../hooks/useTryLogin";
import { LoginForm } from "../components/LoginForm/LoginForm.component";
const FAILED_SIGNIN = "Couldn't signin";
const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    fontSize: 12,
    background: theme.palette.blue.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
}));

interface LoginProps {}

function Login(_props: LoginProps): JSX.Element {
  // user try auth map
  const classes = useStyles({});
  const [tryAuthState, setTryAuthState]: UseAuthPayload = useState<AuthPayload<string | null>>({
    email: null,
    password: null
  });
  const [tryAuth] = useTryAuth(tryAuthState);
  // reset validation error  signin type
  const [formTouched, setFormTouched] = useValidationError();

  function handleTryAuth(form: AuthPayload<string | null>): void {
    setTryAuthState(form);
    setFormTouched(true);
  }

  const [useFormVal, setFormVal]: [FormState, Function] = useState<FormState>(
    tryAuth.state
  );
    // btn state from form valid and api response
  const handleFormValidation = (valid: FormState) => {
    // keep error state
    // ignore further rerender which would be valid as form is valid
    if(useFormVal === "error" && formTouched) {
      return;
    }
    setFormVal(valid);
  };

  React.useEffect(() => {
    setFormVal(tryAuth.state);
  }, [tryAuth.state]);

  useEffect(() => {
    localStorage.removeItem("naister_user_customer_id");
    // eslint-disable-next-line
    persistor.purge().then((_) => console.log("cache cleared"));
  }, []);
  const handleResetValidationError: () => void = () => setFormTouched(false);

  return (
    <PageTheme>
      <div className={classes.root}>
        <LoginForm
          data-testid="login-form"
          tryAuth={handleTryAuth}
        />
      </div>
    </PageTheme>
  );
}

export default Login;
