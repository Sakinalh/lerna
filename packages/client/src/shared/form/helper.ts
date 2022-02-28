import produce from "immer";
import { safeGet, safeMutablePatchObj, safeMutableSet } from "src/shared/utils/helper";
import { BaseInputState } from "../../fixtures";
import {
  AuthPayload,
  ErrorMessagesMap,
  FormsControlsRef,
  FormsControlState,
  ValidateState,
  Value
} from "../../model";
import { isObject } from "../utils";
import {
  AppFormState,
  BaseFormElementState,
  CustomValidator,
  FormArrayState,
  FormCtrlValidator,
  FormElementState,
  FormGroupState,
  Primitive,
  ValidationKey
} from "./model";

/* ******** UI *********** */

export const ERROR_MSG: ErrorMessagesMap = {
  required: "this field is required",
  minLength: "this field is too short",
  isEqual: "Fields are not identical",
  isUrl: "Not a valid url ",
  isEmail: "Not a valid email",
  isPwd: "valid pwd: longer than 5 characters"
};

/**
 *
 * display error msg
 * @export
 * @param {FormsControlState} input
 * @returns {string}
 */
export function displayErrorHint(input: FormsControlState<any>): string {
  const {
    state: { errorDisplay }
  } = input;

  return errorDisplay ? ERROR_MSG[errorDisplay] : ("" as string);
}

/**
 * display login submit result.ERROR_MSG
 *  Default value is true to initial invalid form state
 * @export
 * @param {FormsControlState} fc
 * @returns {boolean}
 */
export function uiValidation(fc: FormsControlState<any>): boolean {
  return fc.state.touched ? fc.state.valid : true;
}

export function displayHint(input: FormElementState) {
  if(!input || input.isPristine) {
    return false;
  }

  return !(input.isValid!).value; // if invalid->display(true)
}

/* ******** FORM MUTATION *********** */

export function mergeAppFormGroup<T extends FormGroupState>(
  value: Object,
  formState: T,
  amendInstanceValidator: FormCtrlValidator = []
): T {
  const _u = {};
  for(const prop in value) {
    _u[prop] = updateCtrlInput(value[prop], formState.formGroup[prop], amendInstanceValidator);
  }
  return produce(formState, (draftState) => {
    draftState.formGroup = {
      ...formState.formGroup,
      ..._u
    };
    draftState.__value = {
      ...formState.__value,
      ...value
    };
    draftState.isPristine = false;
    (draftState.isValid !).value = (formState.isValid !).value;
  });
}

export function patchAppFormGroup<T>(
  inputKey: string,
  value: any,
  formState: T,
  amendInstanceValidator: FormCtrlValidator = []
): T {
  return produce(formState, (draftState) => {
    draftState[inputKey] = updateCtrlInput(value, formState[inputKey], amendInstanceValidator);
  });
}

export function updateCtrlInput(
  value: Primitive,
  formCtrlState: FormElementState,
  amendInstanceValidator: FormCtrlValidator = []
): FormElementState {
  // TODO deduplicate amendInstanceValidator
  // it will be concat as many as it is rendered
  // for now, just apply default or custom is latter is set
  const _validations = amendInstanceValidator.length > 0 ? amendInstanceValidator : formCtrlState.__validations;
  try {
    return {
      ...formCtrlState,
      isPristine: false,
      __validations: _validations,
      isValid: validate(value, _validations),
      __value: value
    };
  } catch (e) {
    // eslint-disable-next-line
    console.warn(e, "input state is not a valid format", formCtrlState);
    return formCtrlState;
  }
}

/*
    function updateFormState(form, ctrState: Partial<BaseFormElementState>, traverse?: { path: string[], childState: any }) {
        const {__path, __value, __key} = ctrState;
        if (__path === undefined || (traverse as undefined) === undefined) {
            console.warn(ctrState, ' has no path set')
            return form
        }

        console.log( __path)

        const ctrl = safeGet(form, ...__path)
        if (ctrl === null) {
            console.warn(ctrl, form, __path, ' is not found or traversed')

            return form
        }

        if (__path.length === 0) {
            console.log(ctrl, form, __path, ' root')

            return form
        }

        if (traverse) {
            const nextPath = traverse.path.slice(0, -1);
            const nextControlState = safeGet(form, ...nextPath)

            const _next = produce(nextControlState, (draft) => {
                if (Array.isArray(draft.__value)) {
                    console.log('set array 0000', form, nextControlState,  nextControlState.__value[traverse.childState.__key], traverse.childState.__value)
                    draft.__value[traverse.childState.__key] = traverse.childState.__value

                } else if (isObject(draft.__value)) {
                    console.log('set obj 0000', form, nextControlState.__value, traverse.childState, traverse.childState.__value)

                    draft.__value[traverse.childState.__key as any] = traverse.childState.__value;

                } else if (nextControlState.hasOwnProperty('__value')) {
                    draft.__value = traverse.childState.__value;
                }
            })

            return updateFormState(form, _next as any )
        }

        const patchForm = produce(form, (draftState) => {

            const ctrlDraft = safeGet(draftState, ...__path);
            if (Array.isArray(ctrlDraft.__value)) {
                ctrlDraft.__value[ctrlDraft.__key] = __value;
            } else if (isObject(ctrlDraft.__value)) {
                ctrlDraft.__value = __value

            } else if (ctrlDraft.hasOwnProperty('__value')) {
                ctrlDraft.__value = __value;
            }

        });

        const nextPath = __path.slice(0, -1);

        const nextControlState = safeGet(patchForm, ...nextPath)

        return updateFormState(patchForm, nextControlState, {path: nextPath, childState: ctrState})

    } */

/**
 * READ ME, all ctrl state has path from root to itself
 * so a leaf node, can update value of its tree
 * (try to bubble up from the leaf to top, but was much trickier)
 *
 * on ctrl update,
 * apply the ctrl value, pristine, valid state from top to target node
 * to go from top to leaf, use a pointer to keep track of previous iteration
 *
 * first checked already traversed node, ->traversed
 * then remaining node, ->remaining based ->remaining
 *
 * then get the node to update with traversed position
 * use the remaining to update __value (top ->down, so it's needed to set it) on the node
 *  the patch is mutable
 *
 *  some node are form state, by checking if has prop __value, if not goes to next
 *
 *
 * when iteration is done, set the new ctrl state as the leaf new state
 * @param form
 * @param ctrState
 * @param iterationCursor
 */

export function updateFormState(form, ctrState: BaseFormElementState, iterationCursor = 0) {
  // path is traversed, apply ctrl state to leaf
  if(iterationCursor >= ctrState.__path.length) {
    const ctrLeaf = safeGet(form, ...ctrState.__path);
    if(ctrLeaf === null) {
      // eslint-disable-next-line
      console.warn("failed, to set leaf ctrl state for ", form, "and full path", ctrState.__path);
      return form;
    }

    return produce(form, (draftState) => {
      safeMutableSet(draftState, ctrState, ...ctrState.__path);
    });
  }

  const traversed: string[] = ctrState.__path.slice(0, iterationCursor);
  // need it to update __value of the node
  const remaining: string[] = ctrState.__path.slice(iterationCursor);
  const next = iterationCursor + 1;

  const ctrl = safeGet(form, ...traversed);

  if(ctrl === null) {
    // eslint-disable-next-line
    console.warn("failed to update ctl for path ", traversed, "for ", form, "with path", ctrState.__path, "at iteration num", iterationCursor);
    return form;
  }

  // skip non form state node
  if(!ctrl.hasOwnProperty("__value")) {
    return updateFormState(form, ctrState, next);
  }

  // update ctrl state node

  const patchForm = produce(form, (draftState) => {
    const mutableCtrl = safeGet(draftState, ...traversed);

    // top down, without remaining cannot know the path to leaf
    // formGroup/formArray are node created by form parser. Does not exist in original value
    const valuePath = remaining.filter(p => p !== "formGroup" && p !== "formArray");

    safeMutablePatchObj(
      mutableCtrl.getValue(),
      ctrState.getValue(),
      ...valuePath
    );

    mutableCtrl.isPristine = false;
    mutableCtrl.isValid.value = (ctrState.isValid !).value;// the message could be empty. don't want to duplicate across node
  });
  return updateFormState(patchForm, ctrState, next);
}

/**
 * update
 * @param value
 * @param formArray
 * @param predicate
 * @param ctrlPath needed for proper parsing. no way to know path to form root , as provide the selection node
 * @param validations
 */
export function updateFormStateSelection<T>(
  value: T,
  formArray: FormArrayState,
  predicate,
  ctrlPath: string[] = ["formArray"],
  validations: Array<ValidationKey> = []
) {
  if(!formArray.hasOwnProperty("__value") || !Array.isArray(formArray.getValue())) {
    // eslint-disable-next-line
    console.log(formArray, " is neither a form state nor an array like ");
    return formArray;
  }

  const selectionPos = formArray.getValue().findIndex(el =>
    predicate.call(null, el, value));

  if(selectionPos < 0) {
    return formArrayPush(formArray, {
      ...makeReactiveStateForm(value, validations, true, formArray.getValue().length.toString()),
      __path: ctrlPath.concat(formArray.getValue().length.toString())
    });
  } else {
    return formArrayDelete(formArray, selectionPos);
  }
}

/**
 *
 * uses immer to be more readable (especially in nested list)
 * careful to mutate array first then check for its validity state
 *
 * @param formArrayStateList
 * @param nextState
 * @param index
 * @param listProp
 */
export function updateFormArray(formArrayStateList: FormElementState, nextState: FormElementState, index: number, listProp?: string): FormElementState {
  if(index < 0) {
    return produce(formArrayStateList, (draftState: any) => {
      try {
        if(listProp) {
          // validation
          // mutate formArray then apply validation
          draftState.formArray.push({ [listProp]: nextState });
          draftState.__value.push({ [listProp]: nextState.getValue() });

          (draftState.isValid.value as any) = upliftChildNodesValidity(draftState.formArray);
        } else {
          // mutate formArray then apply validation

          draftState.formArray.push(nextState);
          draftState.__value.push(nextState.getValue());
          (draftState.isValid.value as any) = upliftChildNodesValidity(draftState.formArray);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.warn(e, "failed to update form array");
      }
    });
  }
  const _index = index.toString();
  return produce(formArrayStateList, (draftState: any) => {
    try {
      if(listProp) {
        // validation
        // mutate formArray then apply validation
        draftState.formArray[_index][listProp] = nextState;
        draftState.__value[_index][listProp] = nextState.getValue();

        (draftState.isValid as any).value = upliftChildNodesValidity(draftState.formArray);

        draftState.isPristine = false;
      } else {
        // mutate formArray then apply validation

        draftState.formArray[_index] = nextState;
        draftState.__value[_index] = nextState.__value;
        draftState.isPristine = false;
        (draftState.isValid as any).value = upliftChildNodesValidity(draftState.formArray);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.warn(e, "failed to update form array");
    }
  });
}

export function formArrayPush(formArray: FormArrayState, value: FormElementState | FormGroupState) {
  return produce<FormArrayState>(formArray, (draftState) => {
    draftState.formArray.push(value as any);
    draftState.__value.push(value.getValue());
    draftState.isPristine = false;

    (draftState.isValid as any).value = upliftChildNodesValidity(draftState.formArray as any);
  });
}

export function formArrayDelete(formArray: FormArrayState, index: number) {
  return produce<FormArrayState>(formArray, (draftState) => {
    draftState.formArray.splice(index, 1);
    draftState.__value.splice(index, 1);
    draftState.isPristine = false;
    (draftState.isValid as any).value = upliftChildNodesValidity(draftState.formArray as any);
  });
}

export function formArrayUpdate(formArray: FormArrayState, index: number, next: FormElementState | Record<string, FormElementState | FormArrayState | FormGroupState>) {
  return produce<FormArrayState>(formArray, (draftState) => {
    if(!next.hasOwnProperty("__value")) {
      // eslint-disable-next-line
      console.warn(next, "is not a state ctrl. the state was not updated");

      return draftState;
    }

    draftState.formArray.splice(index, 1, next as any);
    draftState.__value.splice(index, 1, (next as any).getValue());
    draftState.isPristine = false;
    (draftState.isValid as any).value = upliftChildNodesValidity(draftState.formArray as any);
  });
}

/**
 * simple wrapper to patch Object form state like object
 * lots of form are created like
 * {
 *     [key]:FormState
 * }
 * @param form
 * @param key
 * @param nextState
 */
export function patchRootFormState<T, U>(form: T, key: string, nextState: U) {
  return produce(form, (draftState) => {
    draftState[key] = nextState;
  });
}

export function propagateToFormGroup<T>(
  parentFormState: FormElementState,
  payload: T
) {
  const formFgKey = Object.keys(payload)[0];
  if(!parentFormState.formGroup) {
    return parentFormState;
  }
  return produce(parentFormState, (draftState) => {
    const formFgState = payload[formFgKey];
    draftState.isPristine = false;
    draftState.isValid = formFgState.isValid;
    draftState.__value[formFgKey] = formFgState.getValue();
        draftState.formGroup![formFgKey] = formFgState;
  });
}

/* PARSE */
/**
 * create form control state
 * handle atomic part of form state
 * @param key
 * @param value
 * @param validations
 * @param isPristine
 * @param path
 */
export function makeCtrlState(key: string, value: Value, validations: FormCtrlValidator, isPristine: boolean, path: any[] = []): FormElementState {
  return {
    isValid: validate(value, validations),
    isPristine,
    __value: value,
    __validations: validations,
    __key: key,
    __path: path,
    // eslint-disable-next-line func-names
    getValue: function () {
      return this.__value;
    }

  };
}

export const RESET_STATE: Partial<BaseInputState<any>> = {
  valid: false,
  touched: false,
  errorDisplay: null
};
export const INITIAL_STATE: BaseInputState<any> = {
  value: "" as string,
  valid: false,
  touched: false,
  errorDisplay: null
};

export function formatInputState<T>(
  validationType: Array<ValidationKey>,
  state: BaseInputState<T> = INITIAL_STATE
): BaseInputState<T> {
  return {
    ...state,
    validationType
  };
}

/*
* FORM STATE
* the idea is each input hand its own value/state. example on ctrl could be invalid but the form could be valid
* or no root value.
*/

/**
 *  advantage
 *  easy.pass in whatever input
 *  downside
 *  no fine control over control validations. it must be defined in the render func
 *

 * @param value
 * @param validations
 * @param isPristine
 * @param key
 * @param parent
 */
export function makeReactiveStateForm(
  value: CtrlBuilder | Value,
  validations: ValidationKey[],
  isPristine: boolean = true,
  key: string = "__default__",
  parent: any[] = []
) {
  try {
    if(value instanceof Map) {
      return parseCtrlBuilder(value, key, true);
    }

    if(Array.isArray(value)) {
      return ({
        formArray: value.map((v, idx) => makeReactiveStateForm(
          v,
          validations,
          isPristine,
          idx.toString(),

          parent.concat(["formArray", idx.toString()])
        )),
        ...makeCtrlState(key, value as any, validations, isPristine, parent)
      });
    }
    if(isObject(value)) {
      const _f = {};
      for(const prop in value as Object) {
        _f[prop] = makeReactiveStateForm(value[prop], validations, isPristine, prop, parent.concat(["formGroup", prop]));
      }
      return ({
        formGroup: _f,
        ...makeCtrlState(key, value, validations, isPristine, parent)
      });
    }
    return makeCtrlState(key, value as any, validations, isPristine, parent);
  } catch (e) {
    // eslint-disable-next-line
    console.warn(e, "failed to convert form", value);
  }
}

function getCtrlBuilderValue(value: CtrlBuilder | Value): Value {
  if(value instanceof Map) {
    return getCtrlBuilderValue(value.get("value") as any);
  }

  if(Array.isArray(value)) {
    return value.map(v => getCtrlBuilderValue(v));
  }
  if(isObject(value)) {
    const _ffg = {};
    for(const key in value as Object) {
      _ffg[key] = getCtrlBuilderValue(value[key]);
    }
    return _ffg;
  }
  return value;
}

/**
 * create form state from  ctrlBuilder  ( see SAMPLE_Z)
 *  advantage
 *  this way can define precisely validation rule for specific form control
 *  downside
 *  hairy to right
 * @param ctrlBuilder
 * @param key
 * @param isPristine
 */
export function parseCtrlBuilder(
  ctrlBuilder: CtrlBuilder,
  key: string = "__default",
  isPristine: boolean = true
): any {
  try {
    if(!(ctrlBuilder instanceof Map)) {
      // eslint-disable-next-line
      console.warn(ctrlBuilder, "is not a valid ctrl builder");
      return setCtrlBuild("", [], []);
    }

    const value: any = ctrlBuilder.get("value");
    const validations: [ValidationKey] = ctrlBuilder.get("validations") as any;
    if(value instanceof Map) {
      return parseCtrlBuilder(value, key, isPristine);
    }

    if(Array.isArray(value)) {
      const _formArr = value.map((el, idx) => makeReactiveStateForm(el, validations, isPristine, idx.toString()));
      const _value = value.map(el => getCtrlBuilderValue(el));
      return ({
        formArray: _formArr,
        ...makeCtrlState(key, _value, validations, isPristine)

      });
    }
    if(isObject(value)) {
      const _fg = {};
      for(const _key in value) {
        const keyValue = value[_key];
        _fg[_key] = makeReactiveStateForm(keyValue, validations, isPristine, _key);
      }
      const _value = getCtrlBuilderValue(value);
      return ({
        formGroup: _fg,
        ...makeCtrlState(key, _value, validations, isPristine)

      });
    }

    return makeCtrlState(key, value, validations, isPristine);
  } catch (e) {
    // eslint-disable-next-line
    console.warn("failed to serialize builder", e, JSON.stringify(ctrlBuilder));
    return {};
  }
}

export type CtrlBuilder = Map<"value" | "validations" | "originalValue", Value | ValidationKey[]>;

export function setCtrlBuild(value: Value, validations: ValidationKey[], originalValue: Value) {
  return new Map([
    ["value", value],
    ["validations", validations],
    ["originalValue", originalValue]

  ]);
}

/**
 * take a form state, return is __value
 * @param formState
 */
export function formStateToPayload<T, U>(
  formState: U
): T {
  const keys = Object.keys(formState);
  return keys.reduce((acc: T, curr: string) => ({
    ...acc,
    [curr]: formState[curr].__value
  }), {} as T);
}

/* VALIDATIONS */

export function getInputValidations<T>(
  inputs: T
) {
  const keys = Object.keys(inputs);
  return keys.reduce(
    (acc, curr) => acc && (inputs[curr].isValid as any).value,
    true
  );
}

export function actionControlsAreValid(ctrls: AppFormState): boolean {
  return Object.keys(ctrls).reduce((accu: boolean, ctrlKey: string): boolean => {
    if(!ctrls[ctrlKey].hasOwnProperty("isValid")) {
      return accu;
    }
    // toggle bool as return invalid state
    return accu && (ctrls[ctrlKey].isValid !).value;
  }, true);
}

export function formStateValidation<T>(formState: T) {
  return actionControlsAreValid(formState as any) ? "valid" : "invalid";
}

/**
 *  Form validation
 */
/**
 * Apply validation rules to control
 *
 * @export
 * @param {*} val
 * @param {Array<ValidationKey>} rules
 * @returns {ValidateState}
 */
export function validate(
  val: Value,
  rules: FormCtrlValidator
): ValidateState | null {
  if(!Array.isArray(rules)) {
    return null;
  }
  return rules.reduce(
    (accu: ValidateState, curr: string | CustomValidator) => {
      if(typeof curr === "string") {
        if(curr === "required") {
          if(Array.isArray(val)) {
            return validationPayload(val.length > 0, "required");
          }
          return validationPayload(notEmpty(val), "required");
        }
        if(curr === "minLength") {
          return validationPayload((val as string).length > 5, "minLength");
        }
        if(curr === "isUrl") {
          return validationPayload(isValidUrl((val as string)), "isUrl");
        }

        if(curr === "isEmail") {
          return validationPayload(isEmail((val as string)), "isEmail");
        }

        if(curr === "isPwd") {
          return validationPayload(isPwd((val as string)), "isPwd");
        }
        // eslint-disable-next-line
        console.warn(curr, " is not a valid validation key");
      }

      if(curr.hasOwnProperty("fn") && curr.hasOwnProperty("key")) {
        return ({
          value: (curr as CustomValidator).fn.call(null, val),
          message: "error"
        });
      }

      return accu;
    },
    { value: true, message: null }
  );
}

/**
 * apply form control validation
 *
 * @param {boolean} value
 * @param {string} message
 * @returns {ValidateState}
 */
function validationPayload(
  value: boolean,
  message: ValidationKey
): ValidateState {
  return {
    value,
    message
  };
}

/**
 *
 *
 * @param {string} val
 * @returns
 */
function notEmpty(val: Primitive | Array<any> | Object): boolean {
  if(Array.isArray(val)) {
    return val.length > 0;
  }
  if(isObject(val)) {
    return Object.keys(val).length > 0;
  }
  if(typeof val === "string") {
    return val.trim() !== "";
  }
  return true;
}

/**
 *
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url: string): boolean {
  /// (http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  // http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+
  return !!url.match(
    /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/g
  );
}

function isEmail(mail: string): boolean {
  return !!mail.match(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
}

function isPwd(pwd: string) {
  return pwd.length > 5;
}

/* LOGIN FORM */
/**
 * set form valid state
 *
 * @export
 * @param {FormControls} ctrls
 * @returns {boolean}
 */
export function controlsAreValid(ctrls: FormControls): boolean {
  return Object.keys(ctrls).reduce((accu: boolean, curr: string): boolean => {
    if(!ctrls[curr].hasOwnProperty("valid")) {
      return accu;
    }
    // toggle bool as return invalid state
    return accu && ctrls[curr].valid;
  }, true);
}

/**
 *
 *format inputs into FormsControlsRef
 * @export
 * @param {Array<[string, InputState, Function, Array<ValidationKey>]>} inputs
 * @returns
 */
export function makeFormState(
  inputs: any
): FormsControlsRef {
  return inputs.reduce((acc, curr) => {
    const [key, inputState, inputStateSetter, inputValidations] = curr;
    const state = {
      [key]: {
        state: inputState,
        setter: inputStateSetter,
        validations: inputValidations
      }
    };
    return {
      ...acc,
      ...state
    };
  }, {});
}

/**
 *
 *
 * @export
 * @param {FormsControlsRef} form
 * @returns {AuthPayload}
 */
export function formsCtrlsToPayload(
  form: FormsControlsRef
): AuthPayload<string | null> {
  const formVal = formStateToValue(form);
  const { loginInput, pwdInput } = formVal;
  return {
    email: loginInput as string,
    password: pwdInput as string
  };
}

/**
 * format forms controls model to payload auth model
 *
 * @export
 * @param {FormsControlsRef} ctrls
 * @returns {{ loginInput?: string ; pwdInput?: string }}
 */
export function formStateToValue(
  ctrls: FormsControlsRef
): { loginInput?: string | null; pwdInput?: string | null } {
  const { confirmInput, ...form } = ctrls;
  return Object.keys(form).reduce(
    (
      acc: { loginInput?: string | null; pwdInput?: string | null },
      curr: string
    ) => ({
      ...acc,
      ...{ [curr]: ctrls[curr].state.value }
    }),
    { loginInput: null, pwdInput: null }
  );
}

// TODO ! traverse all node to get an invalid value node and return
/**
 * companion to updateFormState
 * on update an  array or object, the validity check must be done after the update (else will validate stale values and the next one)
 * one way is on the update function, after applying update ->rerun validity check.
 * by default, bubble up the validity value of the leaf
 *
 * the func will traverse the child nodes for nay falsy valid state value
 * @param nodes
 *
 * example
 *
 * valid-valid-valid  ->valid
 * invalid-valid-invalid  ->invalid
 * valid-valid-invalid  ->valid by design. the first is now valid (latest leaf), bu the third is still invalid
 *
 */
export function upliftChildNodesValidity<T>(nodes: Array<FormElementState | T> | Record<string, FormElementState | T>) {
  if(Array.isArray(nodes as Array<FormElementState | T>)) {
    return (nodes as Array<FormElementState | T>).reduce((acc, curr) => {
      if((curr as any).isValid.value) {
        return acc;
      }
      return false;
    }, true);
  }

  if(isObject(nodes as Record<string, FormElementState | T>)) {
    return Object.keys((nodes as Record<string, FormElementState | T>)).reduce((acc, curr) => {
      if((nodes[curr] as any).isValid.value) {
        return acc;
      }
      return false;
    }, true);
  }

  return true;
}

export const getItemFromLocalStorage = (item: string) => {
  const value = localStorage.getItem(item);
  if(value) {
    return JSON.parse(value);
  }

  return null;
};

export const setItemToLocalStorage = (name: string, item: any) => {
  const formattedItem =JSON.stringify(item);
  if(formattedItem) {
    localStorage.setItem(name, formattedItem);
  }
};
