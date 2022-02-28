import * as React from "react";

/**
 * return [ ] as does not use try to hook action. just trigger action
 *
 * @export
 * @template T
 * @param {T} payload
 * @param {Function} dispatcher
 * @param {Function} [formatData]
 * @returns {[]}
 */

export function useDispachToProps<T>(payload: T, dispatcher: Function, formatData?: Function): [] {
  React.useEffect(() => {
    if(Array.isArray(payload) && payload.length === 0) {
      return;
    }

    const data = formatData ? formatData(payload) : payload;
    dispatcher(data);
  }, [payload, dispatcher, formatData]);

  return [];
}
