import * as React from "react";
import { useSelector } from "react-redux";
import { DataMachineState, StoreState } from "src/model/store";
import { safeGet } from "src/shared/utils";
import { ContentUploadType } from "../../model";
import { AppStateBtn } from "../../../components/AppStateBtn/AppStateBtn.component";

const MAP_TYPE_PATH = {
  kwd_loc_file: {
    path: ["setupApp", "uploadFSM", "kwd_loc_file"],
    value: ["setupApp", "project", "kwd_loc_file"]
  },
  adt_loc_file: {
    path: ["setupApp", "uploadFSM", "adt_loc_file"],
    value: ["setupApp", "project", "adt_loc_file"]
  },
  imgb_loc_file: {
    path: ["setupApp", "uploadFSM", "imgb_loc_file"],
    value: ["setupApp", "project", "imgb_loc_file"]
  },
  prod_loc_file: {
    path: ["setupApp", "uploadFSM", "prod_loc_file"],
    value: ["setupApp", "project", "prod_loc_file"]
  }
};

function _idleContent(
  type: ContentUploadType
): string | JSX.Element {
  return ` upload ${type} file`;
}

function _successContent(
  type: ContentUploadType
): string | JSX.Element {
  return ` ${type} was successfully added`;
}

function _errContent(
  type: ContentUploadType
): string | JSX.Element {
  return ` failed to add ${type} file`;
}

function _loadingContent(): string | JSX.Element {
  return "uploading ....";
}

const MAP_TYPE_CONTENT: Record<DataMachineState, Function> = {
  idle: _idleContent,
  success: _successContent,
  error: _errContent,
  loading: _loadingContent
};

function generateContent(type: ContentUploadType, state: DataMachineState) {
  const _genFn = MAP_TYPE_CONTENT[state];
  if(_genFn) {
    return _genFn.call(null, type, state);
  }
  return "";
}

/**
 * success means the api has stored the file and g-return its location
 * takes precedents over any side effect
 * @param state
 * @param fileLocation
 */
function amendState(state: DataMachineState, fileLocation: string): DataMachineState {
  if(fileLocation) {
    return "success";
  }

  return state;
}

interface UploadStateBtnProps {
    type: ContentUploadType;
    onAction: Function;
}

export function UploadStateBtn(props: UploadStateBtnProps): JSX.Element {
  const { onAction, type } = props;
  const _dataState = useSelector((state: StoreState) =>
    safeGet(state, ...MAP_TYPE_PATH[type].path));

  const fileLocation = useSelector((state: StoreState) =>
    safeGet(state, ...MAP_TYPE_PATH[type].value));
  const dataState = amendState(_dataState, fileLocation);

  const content = generateContent(type, dataState);
  const disableClass = dataState === "loading" ? "disable" : "";

  return (
    <AppStateBtn dataState={dataState} onAction={onAction} disable={disableClass}>
      {content}

    </AppStateBtn>
  /*        <Button
                    variant="contained"
                    color="secondary"
                    disabled={formState === "loading"}
                    onClick={(_) => onAction()}
                    classes={{
                        label: classes.label,
                        root: clsx(classes.btnRoot, classes[formState]),
                    }}
                >
                    {content}
                </Button> */
  );
}
