import { useEffect, useState } from "react";
import { BaseInputState } from "src/fixtures";
import { FormsControlsRef, FormUpdatePayload, UseHooks, UseLoginHook, ValidateState } from "src/model";
import { controlsAreValid, formatInputState, makeFormState, validate, ValidationKey } from "src/shared/form";

const loginInitialState: BaseInputState<string | null> = formatInputState([
  "required",
  "isEmail"
]);
const pwInitialState: BaseInputState<string | null> = formatInputState([
  "required",
  "minLength"
]);
const confirmInitialState: BaseInputState<string | null> = formatInputState([]);

/**
 *
 *
 * @param {FormUpdatePayload} f
 * @param {FormsControlsRef} formState
 */
function updateFormState(
  f: FormUpdatePayload,
  formState: FormsControlsRef
): void {
  const { value, name } = f;
  if(formState.hasOwnProperty(name)) {
    const stateValidation = formState[name].validations;
    const stateSetter = formState[name].setter;
    const validationState = validate(value, stateValidation);
    const updatedF = {
      value,
      touched: true,
      valid: (validationState as ValidateState).value,
      errorDisplay: !(validationState as ValidateState).value
        ? (validationState as ValidateState).message
        : null
    };
    stateSetter(updatedF);
  }
}

/**
 *
 *
 * @export
 * @param {boolean} isSignUp
 * @returns {UseLoginHook}
 */
export function useLoginForm(isSignUp: boolean): UseLoginHook {
  // state
  const [loginInput, setLoginInput]: UseHooks<BaseInputState<string | null>> = useState(loginInitialState);
  const [pwdInput, setPwdInput]: UseHooks<BaseInputState<string | null>> = useState(pwInitialState);
  const [confirmInput, setConfirmInput]: UseHooks<BaseInputState<string | null>> = useState(pwInitialState);
  const [isFormValid, setIsFormValid]: any = useState(false);
  // global state of form && access to use state method
  const inputsRef: FormsControlsRef = makeFormState([
    [
      "loginInput",
      loginInput,
      setLoginInput,
            loginInitialState.validationType as Array<ValidationKey>
    ],
    [
      "pwdInput",
      pwdInput,
      setPwdInput,
            pwInitialState.validationType as Array<ValidationKey>
    ],
    [
      "confirmInput",
      confirmInput,
      setConfirmInput,
            confirmInitialState.validationType as Array<ValidationKey>
    ]
  ]);

  useEffect(() => {
    // in signin mode, return true as don't need to test the condition

    const fieldsToValidate = isSignUp
      ? { loginInput, pwdInput, confirmInput }
      : { loginInput, pwdInput };

    const testIsEqual = isSignUp ? pwdInput.value === confirmInput.value : true;

    inputsRef.confirmInput.state.errorDisplay = testIsEqual ? null : "isEqual";
    const formValidationState =
            controlsAreValid(fieldsToValidate) && testIsEqual;
    setIsFormValid(formValidationState);
  }, [
    isSignUp,
    loginInput,
    pwdInput,
    confirmInput,
    confirmInput.value,
    inputsRef.confirmInput.state,
    inputsRef.confirmInput.state.errorDisplay
  ]);
  return {
    loginInput,
    pwdInput,
    confirmInput,
    isFormValid,
    inputsRef,
    updateFormState
  };
}
