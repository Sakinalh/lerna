import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "src/deps";
import clsx from "clsx";
import { TypographyProps } from "@mui/material";
import { ReactElement } from "react";

const capitalizeStyle: Object = {
  all: { textTransform: "capitalize" },
  first: {
    "&:first-letter": {
      textTransform: "capitalize"
    }
  },
  uppercase: {
    textTransform: "uppercase"

  },
  lowercase: {
    textTransform: "lowercase"
  },
  none: {}
};

const typeStyle = {
  text: {},
  link: {
    textDecorationLine: "underline"
  }
};

const boldStyle = {
  none: "inherit",
  bold: 700,
  light: 100
};
const useStyles = (themeColor: string, capitalize: "all" | "first" | "none" | "uppercase" | "lowercase", type: "text" | "link", bold: "none" | "bold" | "light") => makeStyles({
  root: {
    color: `${themeColor}`,
    fontWeight: boldStyle[bold],
    ...typeStyle[type],
    ...capitalizeStyle[capitalize]
  }
});

export interface AppTextProps {
    text: string | ReactElement | number;
    capitalize?: "all" | "first" | "none" | "uppercase" | "lowercase";
    type?: "text" | "link";
    bold?: "none" | "bold" | "light";
    themeColor;
    props?: TypographyProps;
    customclass ?: String;
}

function mergeClassName(classNames: Object | undefined, baseClassName: Object) {
  if(!classNames) {
    return baseClassName;
  }

  return Object.keys(classNames).reduce((acc, curr) => {
    const _base = baseClassName.hasOwnProperty(curr) ? baseClassName[curr] : {};

    return {
      ...acc,
      [curr]: clsx(_base, classNames[curr])
    };
  }, {});
}

export function AppText({
  text = "",
  capitalize = "none",
  themeColor = "inherit",
  type = "text",
  bold = "none",
  customclass = "",
  props = {}
}: AppTextProps): JSX.Element {
  const base_classes = useStyles(themeColor, capitalize, type, bold)({});

  const { classes, ...rest } = props as any;

  return <Typography
    className={customclass}
    classes={mergeClassName(classes, base_classes)}
    {...rest}
  >
    {text}
  </Typography>;
}
