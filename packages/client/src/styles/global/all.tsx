import { tooltips } from "../global/tooltips";
import { reset } from "../global/reset";

export const globalStyle = theme => ({
  "@global": {
    ...reset,
    ...tooltips(theme)
  }
});
