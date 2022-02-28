export type SetupFormState = "url" | "sem" | "name" | "cred" | "limitation";

export interface SetupTryAction<T> {
    state: SetupFormState;
    content: T;
    nextState: SetupFormState | null;
}

export type SetupFormPayload = Record<string, ProjectPayload>;

export interface CreateProjectForm {
    project_name: string;
    customer_id: string;
    adt_loc_file: string | null;
    kwd_loc_file: string | null;
    imgb_loc_file: string | null;
    prod_loc_file: string | null;
    website: string;
}

export type ContentUploadType =
    | "adt_loc_file"
    | "kwd_loc_file"
    | "imgb_loc_file"
    | "prod_loc_file";
export type ProjectProp =
    | "customer_id"
    | "project_name"
    | "website"
    | ContentUploadType;
export type ProjectPayload =
    | string
    | FormData
    | null
    | boolean
    | [ContentUploadType, ContentUploadType]
    | {
    url: string;
    state: Record<"project_name" | "customer_id", string>;
};

export interface SetupFile {
    name: string;
    file: File;
}

export interface TryPatchProjectPayload<T> extends SetupTryAction<T> {
    url: string;
}

export type AsyncPayload =
    | {
    url: string;
    state: { project_name: ProjectPayload };
}
    | {
    url: string;
    state: { customer_id: ProjectPayload };
};
export type FilePayload = {
    keep: boolean;
    values: [ContentUploadType, ContentUploadType];
};
export type PatchProject = Record<ProjectProp, string>;
export type SetupNextPayload =
    | PatchProject
    | FormData
    | AsyncPayload
    | { keep: boolean; values: [ContentUploadType, ContentUploadType] }
    | {};
