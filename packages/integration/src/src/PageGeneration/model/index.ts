import { StringDecoder } from "node:string_decoder";
import { FormArrayState, FormBuilder, FormElementState } from "src/shared/form";

export * from "./list";
export * from "./api";

export interface AppFormProps {
    formInit: FormBuilder;
    formOrder: string[];
    onFormSubmit: Function;
}

export interface FormProps {
    formOrder: string[];
    onFormSubmit: Function;
}

export interface BaseActionsModalProps {
    onClose: Function;
    index: string;
}

export const SELECTED_COLUMNS_SEP = ",";

export interface VariableFormValueInterface {
    value: FormElementState | FormArrayState;
    selected_columns: FormArrayState; // split text into list
    source_files: FormArrayState;

}

export interface VariableFormInterface extends VariableFormValueInterface {
    name: FormElementState;
    type: FormElementState;
}

export interface FilterProductInterface {
    name: string;
    operators: string[];
    type: string;
    display_name: string;
    category: string;
    possible_values?: string[];
}
