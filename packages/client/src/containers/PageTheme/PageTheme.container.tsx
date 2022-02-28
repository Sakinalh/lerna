import * as React from "react";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import { lightTheme } from "../../styles/themes/lightTheme";
import { PageThemeChild } from "./PageTheme.child";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export function PageTheme(props: any): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <PageThemeChild>{props.children}</PageThemeChild>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
