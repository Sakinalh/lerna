import { ValidateState } from "src/model";

export type ValidationKey =
    | "required"
    | "minLength"
    | "isEqual"
    | "isUrl"
    | "isEmail"
    | "isPwd";
export type ControlStateBuilder = [value: any, validator: ValidationKey []];
export type FormBuilder = Record<string, ControlStateBuilder>;

export interface CustomValidator {
    fn: Function,
    key: string
}

export type FormCtrlValidator = Array<ValidationKey | CustomValidator>;

export interface FilterRange<T> {
    filter: T;
    min_value: number;
    max_value: number;
}

export interface FormFilterRangeState extends FormGroupState {
    formGroup: {
        filter: FormGroupState;
        max_value: FormGroupState;
        min_value: FormGroupState;
    }

}

export interface UtmGroupFormInterface extends BaseFormElementState {
    formGroup: {
        name: FormElementState;
        value: FormElementState;

    };
}

export interface FormArrayState extends BaseFormElementState {
    formArray: Array<AppFormState | FormElementState>;
}

export interface FormGroupState extends BaseFormElementState {
    formGroup: AppFormState;
}

export interface FormElementState extends BaseFormElementState {
    formGroup?: AppFormState;
    formArray?: AppFormState[];

}

export interface BaseFormElementState {
    isPristine: boolean;
    isValid: ValidateState | null;
    __value: any;
    __key: string;
    __validations: FormCtrlValidator;
    __path: any;
    getValue: Function;

}

export interface FormItemChange {
    idx: number;
    value: FormElementState;
    isValid: boolean;
}

export type AppFormState = Record<string, FormElementState>;

export type InputType =
    | "text"
    | "textarea"
    | "select"
    | "checkbox"
    | "autocomplete"
    | "number"
    | "object"
    | "array";
export type FormInterface = Object;
export type Primitive = string | boolean | number;

export interface InputMeta {
    label: string;
    type: InputType;
    props: {
        id: string;
        "aria-describedby": string;
        type?: "text" | "number" | "textarea" | "password";
        multiline?: boolean;
        rows?: number,
        autoComplete?: string
    };
}

export type StateControlConstructor = [value: any, validations: ValidationKey[]];
