import { useEffect, useState } from "react";

/**
 *
 *
 * @export
 * @template T
 * @param {T} newState
 * @param {Function} func
 * @returns {[T]}
 */
export function useRerender<T>(newState: T, func: Function): [T] {
  const statePair: [T, Function] = useState(newState);
  const stateSetter = statePair[1];

  useEffect(() => {
    const storeUpdated = func.call(null, newState);
    stateSetter(storeUpdated);
    // store are mutated, send back store new state
  }, [newState, stateSetter, func]);
  return [newState];
}
