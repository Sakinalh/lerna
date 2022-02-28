import createMixins from "@material-ui/core/styles/createMixins";
import { createTheme } from "@mui/material/styles";

// interface declaration merging to add custom mixins
declare module "@material-ui/core/styles/createMixins" {
  interface Mixins {
    flex: ($flex: "flex", $direction, $justify, $align, $wrap) => {},
    pxToRem: ($size, $htmlFontSize) => string,
    size: ($width, $height) => {},
    position: ($position, $top, $right, $bottom, $left) => {}
    visuallyhidden: () => {}
    triangle: ($width, $direction, $color) => {}
  }
}
// get original configs to be used for following `createMixins`
const { breakpoints, spacing } = createTheme();
const mixins = createMixins(breakpoints, spacing, {
  flex: ($flex: string, $direction, $justify, $align, $wrap) => ({
    display: $flex,
    alignItems: $align,
    justifyContent: $justify,
    flexDirection: $direction,
    flexWrap: $wrap
  }),
  pxToRem: ($size, $htmlFontSize) => `${($size / $htmlFontSize)}rem`,
  size: ($width, $height) => ({
    height: $height,
    width: $width
  }),
  position: ($position, $top, $right, $bottom, $left) => {
    const params = {top: $top, right: $right, bottom: $bottom, left: $left};
    for(const k in params) {
      if(params[k] === null) {
        delete params[k];
      }
    }
    return {
      position: $position,
      ...params
    };
  },
  visuallyhidden: () => ({
    margin: "-1px",
    padding: "0",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    position: "absolute"
  }),
  triangle: ($width, $direction, $color) => {
    if($direction === "up") {
      return {
        width: 0,
        height: 0,
        borderLeft: `calc(${$width} / 2) solid transparent`,
        borderRight: `calc(${$width} / 2) solid transparent`,
        borderBottom: `calc(${$width} / 2) solid ${$color}`
      };
    }
    if($direction === "left") {
      return {
        width: 0,
        height: 0,
        borderTop: `calc(${$width} / 2) solid transparent`,
        borderBottom: `calc(${$width} / 2) solid transparent`,
        borderRight: `calc(${$width} / 2) solid ${$color}`
      };
    }
    if($direction === "right") {
      return {
        width: 0,
        height: 0,
        borderTop: `calc(${$width} / 2) solid transparent`,
        borderBottom: `calc(${$width} / 2) solid transparent`,
        borderLeft: `calc(${$width} / 2) solid ${$color}`
      };
    }
    if($direction === "down") {
      return {
        width: 0,
        height: 0,
        borderLeft: `calc(${$width} / 2) solid transparent`,
        borderRight: `calc(${$width} / 2) solid transparent`,
        borderTop: `calc(${$width} / 2) solid ${$color}`
      };
    }
  }
});

/**
 * Those values override property color of material ui:
 * { primary | secondary | error | info |  success | warning }
 * ex: <Button color="primary"> Button primary </Button>
 * the primary color will be the one overrided in customPalette below
 */
const customPalette = {
  primary: {
    // light: will be calculated from palette.primary.main,
    main: "#397EF5",
    dark: "#1C39AD" // will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  secondary: {
    // light: will be calculated from palette.primary.main,
    main: "#7B7B7B"
    // dark: "#1C39AD" // will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  error: {
    // light: will be calculated from palette.primary.main,
    main: "#DE350B",
    dark: "#A63535" // will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  success: {
    // light: will be calculated from palette.primary.main,
    main: "#30B058",
    dark: "#1C39AD" // will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  warning: {
    main: "#FF8A00"
  },
  info: {
    main: "#7166F6"
  },
  /**
   * here start colors used in all the application
   * They are available in component styles like this:
   * theme.palette.blue.main
   */
  black: "#111827",
  blue: {
    main: "#397EF5",
    dark: "#1C39AD",
    middle: "#CDDDFF",
    light: "#EFF5FF"
  },
  green: {
    main: "#30B058",
    dark: "#3A8E54"
  },
  grey: {
    dark: "#7B7B7B",
    middle2: "#B6B6B6",
    middle1: "#DFDFDF",
    light: "#F4F3F3",
    extraLight: "#F2F2F2",
    extraExtraLight: "#FAFAFA"
  },
  orange: {
    main: "#FF8A00"
  },
  red: {
    main: "#DE350B",
    dark: "#A63535",
    light: "#d69f9c"
  },
  white: "#FFFFFF",
  yellow: {
    main: "#DBC327",
    dark: "#C0AE34"
  }
};

/**
 *  custom value for box Shadow :
 */
const customShadow = Array(25).fill("none");

/**
 *  custom value for box Shape :
 */
const customShape = {
  border: {
    solidGrey: "1px solid #ebeded",
    dashedGrey: "1px dashed #ebeded",
    radiusMin: 4
  },
  objectShadow: {
    boxShadowRight: "10px -2px 5px -6px rgba(0,0,0,0.05)",
    boxShadowAll: "0 1px 2px 0 rgba(0,0,0,0.1)",
    boxShadowTop: "0px 0px 4px rgba(0,0,0,0.1)",
    boxShadowLight: "0 1px 15px 0 rgba(0,0,0,0.05)",
    boxShadowPopOver: "0px 4px 8px 4px rgba(0, 0, 0, 0.05)"
  },

  constShape: {
    defaultFontSize: "1.2em",
    queueCellHeight: 150 /* ugly but only way to enforce same row height when each  table are generated by columns (y axis) */
  }
};

export const APP_THEME = createTheme({
  mixins,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    ...customPalette
  },
  shadows: {
    ...customShadow
  },
  shape: {
    ...customShape
  },
  typography: {
    fontFamily: ["Poppins", "Open Sans"].join(","),
    h1: {
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: "36px"
    },
    h2: {
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 600
    },
    h3: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "21.79px"
    },
    subtitle1: {
      // title
      fontFamily: "Open Sans",
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "19.07px"
    },
    subtitle2: {
      // chapeau
      fontFamily: "Open Sans",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "19.07px"
    },
    body1: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16.34px"
    },
    caption: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "10px",
      lineHeight: "13.62px"
    }
  }
});
