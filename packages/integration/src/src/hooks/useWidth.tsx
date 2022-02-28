import { Theme, useTheme, Breakpoint } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type BreakpointOrNull = Breakpoint | null;

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
export function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export function setSpacing(bp, base, coef) {
  const ratio = base * coef;
  switch (bp) {
    case "xl":
      return base + (4 * ratio);
    case "lg":
      return base + (3 * ratio);
    case "md":
      return base + (2 * ratio);
    case "sm":
      return base + ratio;
    case "xs":
      return base;
  }
}
