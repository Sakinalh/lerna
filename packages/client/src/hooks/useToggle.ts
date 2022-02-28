import { useState } from "react";

/**
 *  handy wrap around simple toggle
 *
 * @export
 * @param {boolean} initState
 * @returns {[boolean, (b?: boolean) => void]}
 */
export function useToggle(
  initState: boolean
): [boolean, (b?: boolean) => void] {
  const [toggleState, setToggleState] = useState(initState);
  const handleUiToogle: (b?: boolean) => void = (b = !toggleState) => setToggleState(b);
  return [toggleState, handleUiToogle];
}
