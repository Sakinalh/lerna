import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useEffect, useState } from "react";
import { StateActionSubmit } from "src/components/StateActionSubmit/StateActionSubmit.component";
import { FormState } from "src/model";
import { Typography } from "src/deps";
import immer from "immer";
import { CHANGE_PWD_API } from "src/api/routes/api_routes";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { FormElementState, formStateToPayload, formStateValidation, makeReactiveStateForm } from "src/shared/form";
import { vanillaPost } from "../../shared/helper";

const useStyles = makeStyles(theme => ({

  form: {},
  error: {
    paddingTop: 15,
    color: theme.palette.error.main
  }
}));

function isEqual(a) {
  return b => a === b;
}

interface ChangeFormState {
    password: FormElementState;
    confirm: FormElementState

}

interface ChangeFormValue {
    password: string;
    confirm: string

}

function parseForm(datum: ChangeFormValue, isPristine = true): ChangeFormState {
  return {
    password: makeReactiveStateForm(datum.password, ["required", "isEmail"], isPristine, "password"),
    confirm: makeReactiveStateForm(datum.confirm, ["isEmail"], isPristine, "confirm")

  };
}

interface ChangePwdFormProps {
    onFormSubmitted: Function;
    token: string;
}

export function ChangePwdForm({ onFormSubmitted, token = "" }: ChangePwdFormProps): JSX.Element {
  const classes = useStyles({});

  const [resetForm, setResetForm] = useState<ChangeFormState>(() =>
        parseForm({
          password: "",
          confirm: ""

        }) as any);
  const [formState, setFormState] = useState<FormState>("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    // rerun same validation on form change (mainly pwd)
    const update: any = immer(resetForm, (draftState) => {
      (draftState.confirm.isValid !).value = isEqual(resetForm.password.getValue())(resetForm.confirm.__value);
    });
    setResetForm(update);

    // form validation
    const nextFormState = formStateValidation(update);
    setFormState((prev) => {
      if(prev !== nextFormState) {
        return nextFormState;
      }
      return prev;
    });
  }, [resetForm]);

  useEffect(() => {
    onFormSubmitted(formState);
  }, [formState, onFormSubmitted]);

  function handleFormGroupChange(formState: ChangeFormState) {
    return (payload: Partial<ChangeFormState>) => {
      setResetForm({ ...formState, ...payload });
    };
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormState("pending");
    const payload = formStateToPayload<{ password: string }, ChangeFormState>(
      resetForm
    );
    const _value = Object.values(payload)[0];

    const formData = new FormData(); // Currently empty
    formData.append("password", _value as any);
    formData.append("token", token);

    vanillaPost(CHANGE_PWD_API, formData)
      .then((_res) => {
        setFormState("success");
        setErr("");
      })
      .catch((e) => {
        const errMsg = e.status ? e.status : "something went wrong";
        setFormState("error");
        setErr(errMsg);
      });
  }

  const btnValid = formState === "valid" ? "" : "disable";

  return (

    <form className={classes.form}
      noValidate
      onSubmit={handleSubmit}
    >

      <AppFormGroup
        label="password"
        inputKey="password"
        inputState={resetForm.password}
        formGroupChange={handleFormGroupChange(resetForm)}
        hint={resetForm.password.isValid?.message!}
        inputProps={{
          "aria-describedby": "password",
          type: "password"
        }}
      />

      <AppFormGroup
        label="confirm"
        inputKey="confirm"
        inputState={resetForm.confirm}
        formGroupChange={handleFormGroupChange(resetForm)}
        hint={resetForm.confirm.isValid?.message!}
        customValidations={[
          { fn: isEqual(resetForm.password.getValue()), key: "isEqual" }

        ]}
        inputProps={{
          "aria-describedby": "confirm",
          type: "password"

        }}
      />

      <StateActionSubmit formState={formState} disable={btnValid}>
        <span>
          Change password
        </span>
      </StateActionSubmit>
      <Typography variant="body1"
        classes={{ root: classes.error }}>
        {err}
      </Typography>

    </form>

  );
}
