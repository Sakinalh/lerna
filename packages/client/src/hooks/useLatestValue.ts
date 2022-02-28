import * as React from "react";

/**
 * simple wrapper to trigger rerender on input changes
 *
 * @export
 * @template T
 * @param {T} value
 * @param {T} initialValue
 * @returns {[T, Function]}
 */
export function useLatestValue<T>(value: T, initialValue: T): [T, Function] {
  const [updatedValue, setUpdatedValue] = React.useState(initialValue);
  React.useEffect(() => {
    setUpdatedValue(value);
  }, [value]);
  return [updatedValue, setUpdatedValue];
}
