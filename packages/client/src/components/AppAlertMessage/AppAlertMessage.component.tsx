import { Alert, AlertTitle } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AlertProps, Color } from "@mui/material/Alert";
import { AlertTitleProps } from "@mui/material/AlertTitle";
import { useStyles } from "./AppAlertMessage.style";

export interface AppAlertMessageProps {
  children: React.ReactNode,
  title: string,
  severity: Color
}

export const AppAlertMessage: React.FC<AppAlertMessageProps & AlertProps & AlertTitleProps> = (props) => {
  const classes = useStyles();

  const icons = {
    success: <CheckCircleOutlineIcon fontSize="inherit" />,
    error: <ErrorOutlineOutlinedIcon fontSize="inherit" />,
    warning: <ReportProblemOutlinedIcon fontSize="inherit" />,
    info: <InfoOutlinedIcon fontSize="inherit" />
  };

  const {
    children,
    title,
    severity

  } = props;

  const switchVariant = (severity): "standard" | "filled" => {
    switch (severity) {
      case "info":
        return "standard";
      case "error":
        return "filled";
      case "warning":
        return "filled";
      // case "info":
      //   return "filled";
      case "success":
        return "filled";
    }
  };

  return (
    <Alert className={classes.root} variant={switchVariant(severity)} iconMapping={icons} classes={{
      "icon": `alertMessage__icon ${severity === "info" ? "alertMessage__icon--info" : "alertMessage__icon--white"}`,
      "message": "alertMessage__message",
      "filled": "alertMessage--filled",
      "standard": "alertMessage--filled",
      "filledSuccess": "alertMessage--filledSucess",
      "filledError": "alertMessage--filledError",
      "standardError": "alertMessage--filledError",
      "filledWarning": "alertMessage--filledWarning",
      "standardInfo": "alertMessage--filledInfo"
    }} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>

  );
};
