import { createTheme, adaptV4Theme } from "@mui/material";
import { APP_THEME } from "../themes/commonTheme";
export const darkTheme = createTheme(adaptV4Theme({

  ...APP_THEME

}));
