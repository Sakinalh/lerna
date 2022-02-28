import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { DataMachineState } from "../model";

/**
 * data machine for data fetch fetching
 * custom with some assumption. mainly
 *  data success/error are mutable/subscribe -> trigger effect
 */

/**
 *
 * dispatch action with
 * @param next
 * @param wait
 */
function dispatchTransition(next: DataMachineState, wait = 0) {
  return new Promise<DataMachineState>((resolve) => {
    setTimeout(resolve, wait, next);
  });
}

/**
 * async dispatch to allow timeout on state change
 * @param dep
 * @param disp
 * @param nextState
 * @param afterTransitionState
 */
function useNextAsyncState<T>(dep: T | null, disp, nextState, afterTransitionState) {
  React.useEffect(() => {
    async function asyncEffect(nextState) {
      const next = await dispatchTransition(nextState, 2000);
      disp.call(null, next);
    }

    if(dep) {
      (async () => {
        const next = await dispatchTransition(nextState);
        disp.call(null, next);
        // reset
        await asyncEffect(afterTransitionState);
      })();
    }
  }, [dep, afterTransitionState, nextState, disp]);
}

/**
 * hooks to handle DataMachineState
 * the sync transition is exposed from transition
 * the async (success/error) are inferred from the state mutation on success/error
 *  if success fetch props is mutated-> it's successful
 *  if err, failed props is mutated-> it's error
 *
 *  in each case, the async state is transition back to initial state
 * @param successDep
 * @param errorDep
 */
export function useAsyncDataState<T, U, V>(successDep: T | null, errorDep: U | null): [V, Dispatch<SetStateAction<V>>] {
  const INITIAL_STATE: any = "idle";
  const [state, transition] = useState<V>(INITIAL_STATE);

  // effect fire on success dep array
  useNextAsyncState(successDep, transition, "success", INITIAL_STATE);
  // effect fire on fail dep array
  useNextAsyncState(errorDep, transition, "error", INITIAL_STATE);

  return [state, transition];
}

/**
 * validate synchronous transition action
 * @param prev
 * @param next
 */
export function SyncTransition(prev: DataMachineState, next: DataMachineState): DataMachineState {
  const stateValidation = {
    loading: {
      idle: "idle"
    },
    success: {
      loading: "loading"
    },
    error: {
      loading: "loading"
    },
    idle: {
      success: "success",
      error: "error"
    }
  };

  const isTransitionValid = stateValidation[next].hasOwnProperty(prev);
  if(!isTransitionValid) {
    console.warn(`${prev}->${next} is invalid transition.`);
  }
  return isTransitionValid ? next : prev;
}
