import * as React from "react";

/**
 * simple wrapper on effect. call function on trigger changes
 *
 * @export
 * @template T
 * @param {T} trigger
 * @param {Function} cb
 * @param {...Array<any>} arg
 */
export function UseCbOnEffect<T>(
  trigger: T,
  cb: Function = () => null,
  ...arg: Array<any>
): void {
  React.useEffect(() => {
    cb.call(undefined, ...arg);
  }, [cb, trigger, arg]);
}
