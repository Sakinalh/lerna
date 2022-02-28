import * as React from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { IconButton, Typography } from "src/deps";
import { combine } from "../utils";

export interface DayProps extends WithStyles<typeof styles> {
    filled?: boolean;
    outlined?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    startOfRange?: boolean;
    endOfRange?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    value: number | string;
}

const styles = (theme: Theme) =>
  createStyles({
    leftBorderRadius: {
      borderRadius: "50% 0 0 50%"
    },
    rightBorderRadius: {
      borderRadius: "0 50% 50% 0"
    },
    buttonContainer: {
      display: "flex"
    },
    button: {
      height: 36,
      width: 36,
      padding: 0,
      fontSize: "inherit"
    },
    buttonText: {
      lineHeight: 1.6
    },
    outlined: {
      border: `1px solid ${theme.palette.primary.dark}`
    },
    filled: {
      "&:hover": {
        backgroundColor: theme.palette.primary.dark
      },
      backgroundColor: theme.palette.primary.dark
    },
    highlighted: {
      backgroundColor: theme.palette.action.hover
    },
    contrast: {
      color: theme.palette.primary.contrastText
    }
  });

export const Day: React.FunctionComponent<DayProps> = (props) => {
  const { classes } = props;
  return (
    <div
      className={combine(
        classes.buttonContainer,
        props.startOfRange && classes.leftBorderRadius,
        props.endOfRange && classes.rightBorderRadius,
        !props.disabled && props.highlighted && classes.highlighted
      )}
    >
      <IconButton
        className={combine(
          classes.button,
          !props.disabled && props.outlined && classes.outlined,
          !props.disabled && props.filled && classes.filled
        )}
        disabled={props.disabled}
        onClick={props.onClick}
        onMouseOver={props.onHover}
        size="large">
        <Typography
          color={!props.disabled ? "inherit" : ("textSecondary" as any)}
          className={combine(
            classes.buttonText,
            !props.disabled && props.filled && classes.contrast
          )}
          variant="body2"
        >
          {props.value}
        </Typography>
      </IconButton>
    </div>
  );
};

export default withStyles(styles)(Day);
