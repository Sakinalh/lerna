import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { Theme } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import clsx from "clsx";
import { useStyles } from "./AppTooltip.style";
export interface AppTooltipProps {
  customclass?: string;
}

export const AppTooltip: React.FC<AppTooltipProps & TooltipProps> = (props) => {
  const HtmlTooltip = withStyles((theme: Theme) => ({
    arrow: {
      color: "#3985E6"
    },
    tooltip: {
      backgroundColor: "#3985E6",
      color: "white",
      maxWidth: 220,
      fontFamily: "Open Sans",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "16px",
      letterSpacing: 0,
      textAlign: "left",
      boxSizing: "border-box"
    }
  }))(Tooltip);

  const { customclass = null, ...rest } = props;
  const classes = useStyles();
  return <HtmlTooltip className={clsx(classes.root, "appTooltip", customclass)} {...rest} />;
};
