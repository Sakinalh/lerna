import * as React from "react";
import { useEffect, useState } from "react";
import { StateActionSubmit } from "src/components/StateActionSubmit/StateActionSubmit.component";
import { FormState } from "src/model";
import { RESET_PWD_API } from "src/api/routes/api_routes";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { FormElementState, formStateToPayload, formStateValidation, makeReactiveStateForm } from "src/shared/form";
import { AppText } from "src/components/AppText/AppText.component";
import makeStyles from "@mui/styles/makeStyles";
import { vanillaPost } from "../../shared/helper";

const useStyles = makeStyles({
  input: {
    paddingBottom: 10,
    width: "100%"
  }
});
interface ResetFormProps {
    onFormSubmitted: Function
}

interface ResetFormState {
    email: FormElementState;
}

interface ResetFormValue {
    email: string;

}

function parseForm(datum: string, isPristine = true): ResetFormState {
  return {
    email: makeReactiveStateForm(datum, ["required", "isEmail"], isPristine, "email")

  };
}

export function ResetForm({ onFormSubmitted }: ResetFormProps): JSX.Element {
  const classes = useStyles({});
  const [resetForm, setResetForm] = useState<ResetFormState>(() => parseForm(""));
  const [formState, setFormState] = useState<FormState>("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    const nextFormState = formStateValidation(resetForm);
    setFormState(nextFormState);
  }, [resetForm]);

  useEffect(() => {
    onFormSubmitted(formState);
  }, [formState, onFormSubmitted]);

  function handleFormGroupChange(formState: ResetFormState) {
    return (payload: Partial<ResetFormState>) => {
      setResetForm({ ...formState, ...payload });
    };
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormState("pending");
    const payload = formStateToPayload<ResetFormValue, ResetFormState>(
      resetForm
    );
    const _value = Object.values(payload)[0];

    const formData = new FormData(); // Currently empty
    formData.append("email", _value as any);

    vanillaPost(RESET_PWD_API, formData)
      .then((_res) => {
        setFormState("success");
        setErr("");
      })
      .catch((e) => {
        const errMsg = e.email ? e.email[0] : "something went wrong";
        setFormState("error");
        setErr(errMsg);
      });
  }

  const btnValid = formState === "valid" ? "" : "disable";
  return (

    <form noValidate
      onSubmit={handleSubmit}
    >

      <AppFormGroup
        label="email"
        inputKey="email"
        inputState={resetForm.email}
        formGroupChange={handleFormGroupChange(resetForm)}
        hint={resetForm.email.isValid?.message!}
        inputProps={{
          "aria-describedby": "email",
          type: "email"
        }}
        overrideClass={{
          input: classes.input
        }}
      />

      <StateActionSubmit formState={formState} disable={btnValid}>
        <span>
          Reset Password
        </span>
      </StateActionSubmit>

      <AppText text={err} themeColor="dangerColor"/>

    </form>

  );
}
