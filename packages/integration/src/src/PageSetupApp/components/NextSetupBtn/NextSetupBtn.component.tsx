import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetupAppState, StoreState } from "src/model";
import {
  AsyncPayload,
  FilePayload,
  PatchProject,
  SetupFormPayload,
  SetupFormState,
  SetupNextPayload,
  SetupTryAction,
  TryPatchProjectPayload
} from "src/PageSetupApp/model";
import { SETUP_NAME_API, SETUP_WEB_API } from "src/api/routes/api_routes";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { tryPatchProject, trySaveContent, trySetAsync } from "../../store/setupApp";

const useStyles = makeStyles({
  actions: { display: "flex", justifyContent: "flex-end", width: "100%" },
  btn: {
    fontSize: 13,
    color: "white",
    width: "40%",
    borderRadius: 2
  }
});

interface NextSetupBtnProps {
    payload: SetupFormPayload;
    url: string;
    label?: "next" | "send to analyze";
    disabled: boolean;
}

// implicit state machish. current state->next
const SETUP_STATES: Record<SetupFormState, SetupFormState | null> = {
  name: "cred",
  cred: "limitation",
  limitation: "url",
  url: "sem",
  sem: null
};

function setNextState(state: SetupFormState): SetupFormState | null {
  return SETUP_STATES[state];
}

function makePayload(
  state: SetupFormState,
  form: SetupFormPayload
): SetupTryAction<SetupNextPayload> {
  switch (state) {
    case "url": {
      return {
        state,
        content: { website: form.website } as Partial<PatchProject>,
        nextState: setNextState(state)
      };
    }
    case "name": {
      return {
        state,
        content: {
          url: `${SETUP_NAME_API}?project_name=${form.project_name}`,
          state: { project_name: form.project_name } as any
        },
        nextState: setNextState(state)
      };
    }
    case "cred": {
      return {
        state,
        content: {
          url: `${SETUP_WEB_API}?customer_id=${form.customer_id}`,
          state: { customer_id: form.customer_id } as any
        },
        nextState: setNextState(state)
      };
    }
    case "limitation": {
      return {
        state,
        content: {
          keep: form.loadFile,
          values: ["adt_loc_file", "kwd_loc_file"]
        } as any,
        nextState: setNextState(state)
      };
    }
    case "sem": {
      return {
        state,
        content: {
          keep: form.loadFile,
          values: ["imgb_loc_file", "prod_loc_file"]
        } as any,
        nextState: setNextState(state)
      };
    }

    default: {
      return {
        state: "url",
        content: {},
        nextState: setNextState("url")
      };
    }
  }
}

export function NextSetupBtn(props: NextSetupBtnProps): JSX.Element {
  const classes = useStyles(props);
  const { payload, url, disabled, label = "next" } = props;
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: StoreState) => (state.setupApp as SetupAppState).currentStep
  );

  function next() {
    const formattedPayload = makePayload(currentStep, payload);

    // "url" | "sem" | "name" | "cred" | "limitation";
    const actionPayload: TryPatchProjectPayload<SetupNextPayload> = {
      ...formattedPayload,
      url
    };
    switch (formattedPayload.state) {
      case "url": {
        return dispatch(
          tryPatchProject(actionPayload as TryPatchProjectPayload<PatchProject>)
        );
      }
      case "name":
      case "cred": {
        return dispatch(
          trySetAsync(actionPayload as TryPatchProjectPayload<AsyncPayload>)
        );
      }

      case "sem":
      case "limitation": {
        return dispatch(
          trySaveContent(actionPayload as TryPatchProjectPayload<FilePayload>)
        );
      }

      default: {
        console.warn(formattedPayload.state, "is an invalid state");
      }
    }
    /*    if (formattedPayload) {
          //!TODO handle in epic the nav push
          //! Files upload are handled above
          dispatch(tryPostContent(formattedPayload));
          history.push(url);
        } */

    // DEV
  }

  return (
    <div className={classes.actions}>
      <AppBtn
        disabled={disabled}
        variant="contained"
        onClick={next}
        color="secondary"
      >
        {label}
      </AppBtn>
    </div>
  );
}
