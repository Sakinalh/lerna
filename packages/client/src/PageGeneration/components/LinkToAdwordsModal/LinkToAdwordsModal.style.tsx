import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const useStyles = makeStyles({
  dialog: {
    width: ThemeProv,
    padding: 0
  },

  root: {

  }
});
