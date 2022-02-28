import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.button": {
      "& .MuiButton-label": {
        display: "inherit !important",
        textTransform: "capitalize",
        fontWeight: "700"
      },

      "&--underline": {
        textDecoration: "underline"
      },

      "&--arrow": {
        "& > span": {
          display: "inline-flex !important"
        }
      },

      "& > span > span": {
        display: "inline-flex"
      },

      "&--viewResults": {
        color: theme.palette.blue.main,
        border: `1px solid ${theme.palette.blue.main}`,
        height: 35,
        fontSize: 14,
        background: theme.palette.white,
        lineHeight: 35,
        borderRadius: 3,
        width: 111,

        "&:hover": {
          backgroundColor: theme.palette.blue.light
        },

        "&:disabled": {
          border: `1px solid ${theme.palette.grey.middle2}`,
          color: theme.palette.grey.middle2,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },

      "&--PageCardPreview": {
        color: theme.palette.blue.main,
        "& > *:first-child": {

          textTransform: "capitalize",
          fontSize: 14,
          fontFamily: "Open Sans",
          fontWeight: 700
        },

        "& .MuiButton-label": {
          fontWeight: "700"
        },

        "&:hover": {
          color: theme.palette.blue.dark
        },

        "&:disabled": {
          color: theme.palette.grey.middle1,
          pointerEvents: "auto"
        },

        "&.linked": {
          "& > *:first-child": {
            color: theme.palette.white
          }
        }
      },

      "&--light": {
        "& svg": {
          color: theme.palette.grey.middle2
        }
      },

      "&--kwdBtn": {
        background: theme.palette.white,
        border: `1px solid ${theme.palette.blue.main}`,
        boxSizing: "border-box",
        borderRadius: 3,
        color: theme.palette.blue.main,
        lineHeight: "35px",
        height: 36,
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 14,

        "&:hover": {
          backgroundColor: theme.palette.blue.light
        },

        "&:disabled": {
          background: theme.palette.white,
          border: `1px solid ${theme.palette.grey.middle2}`,
          color: theme.palette.grey.middle2,
          boxSizing: "border-box",
          borderRadius: 3,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },
      "&--back": {
        "&:after": {
          position: "relative",
          zIndex: -1
        },
        "&:hover": {
          "& > span:first-child": {
            boxShadow: "inset 0px 0px 0px 16px",
            border: `1px solid ${theme.palette.blue.main}`,
            transition: ".30s all"
          },
          "&  svg": {
            color: theme.palette.blue.main,
            transform: "scale(.85)",
            transition: ".25s all"
          }
        },
        "& > span:first-child": {
          transition: ".25s all",
          borderRadius: "50%",
          background: theme.palette.white,
          border: `1px solid ${theme.palette.grey.middle2}`,
          boxShadow: `inset 0px 0px 0px 0px ${theme.palette.blue.light}`,
          display: "flex"
        },
        "& svg": {
          transition: ".25s all",
          color: theme.palette.grey.dark
        }
      },
      "&--iconRounded": {
        "& .MuiTouchRipple-root": {
          display: "none"
        },
        "& > span:first-child": {
          borderRadius: "50%",
          background: "transparent",
          display: "flex"
        },
        "&:active": {
          background: "transparent"
        },
        "&:hover": {
          background: "transparent",
          "& > span:first-child": {
            background: theme.palette.grey.middle2
          }
        },
        "& svg": {
          transform: "scale(.8)",
          color: theme.palette.grey.dark
        }
      },
      "&--icon": {
        "& svg": {
          color: theme.palette.grey.dark
        }
      },
      "&--filterNav": {
        color: theme.palette.black,
        borderRadius: 3,
        boxShadow: `0 0 2px 0 ${theme.palette.blue.main}`,
        border: "solid 1px transparent",
        backgroundColor: `${theme.palette.white} !important`,
        "&.active": {
          border: `solid 1px ${theme.palette.blue.main}`
        }
      },
      "&--secondary": {
        color: theme.palette.blue.main,
        border: `1px solid ${theme.palette.blue.main}`,
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        background: theme.palette.white,
        "&:hover": {
          backgroundColor: theme.palette.blue.light
        },
        "&:disabled": {
          border: `1px solid ${theme.palette.grey.middle2}`,
          color: theme.palette.grey.middle2,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },
      "&--secondaryDelete": {
        color: theme.palette.white,
        border: "1px solid transparent",
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        background: theme.palette.red.main,
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        "&:disabled": {
          color: theme.palette.red.dark,
          border: `1px solid ${theme.palette.red.dark}`,
          background: theme.palette.white,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },
      "&--delete": {
        background: theme.palette.red.main,
        border: `1px solid ${theme.palette.red.main}`,
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        color: theme.palette.white,
        "&:hover": {
          background: theme.palette.red.main
        },

        "&:disabled": {
          background: theme.palette.grey.middle1,
          border: `1px solid ${theme.palette.red.main}`,
          color: theme.palette.white,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },

      "&--primary": {
        background: theme.palette.blue.main,
        border: `1px solid ${theme.palette.blue.main}`,
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        color: theme.palette.white,

        "&:hover": {
          background: theme.palette.blue.dark
        },

        "&:disabled": {
          background: theme.palette.grey.middle1,
          border: `1px solid ${theme.palette.grey.middle1}`,
          color: theme.palette.white,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },
      "&--customPrimary": {
        background: theme.palette.blue.main,
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        color: theme.palette.white,
        "&.isRed": {
          border: `1px solid ${theme.palette.red.main}`,
          background: theme.palette.red.main,
          "&:not(:disabled):hover": {
            background: theme.palette.red.dark
          }
        },
        "& .MuiButton-label": {
          fontWeight: "700"
        },
        "&:hover": {
          background: theme.palette.blue.dark
        },
        "&.isLinked": {
          border: `1px solid ${theme.palette.green.main}`,
          background: theme.palette.green.main,
          "&&:not(:disabled):hover": {
            background: theme.palette.green.dark
          }
        },
        "&:disabled": {
          background: theme.palette.grey.middle1,
          border: `1px solid ${theme.palette.grey.middle2}`,
          color: theme.palette.white,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },
      "&--customSecondary": {
        color: theme.palette.blue.main,
        border: `1px solid ${theme.palette.blue.main}`,
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        background: theme.palette.white,
        "&:hover": {
          backgroundColor: theme.palette.blue.light
        },
        "&.isWhite": {
          border: `1px solid ${theme.palette.grey.dark}`,
          color: theme.palette.grey.dark,
          "&:not(:disabled):hover": {
            color: theme.palette.blue.main,
            border: `1px solid ${theme.palette.blue.main}`
          }
        },
        fontFamily: "Open Sans",
        fontStyle: "normal",
        textAlign: "center",
        "& .MuiButton-label": {
          fontWeight: "700"
        },
        "&:disabled": {
          backgroundColor: theme.palette.white,
          border: `1px solid ${theme.palette.grey.dark}`,
          color: theme.palette.grey.middle2,
          pointerEvents: "auto",
          cursor: "not-allowed"
        }
      },
      "&--customSimple": {
        "& .MuiButton-label": {
          fontWeight: "700"
        },
        lineHeight: "36px",
        height: 36,
        fontFamily: "Open Sans",
        fontSize: 14,
        fontStyle: "normal",
        letterSpacing: 0,
        color: theme.palette.grey.middle2,
        "&:hover": {
          color: theme.palette.blue.main
        },
        "&:disabled": {
          color: theme.palette.grey.middle1,
          pointerEvents: "auto",
          cursor: "not-allowed"
        },
        "&.isLinked": {
          color: theme.palette.white,
          "&&:not(:disabled):hover": {
            color: theme.palette.white
          }
        },
        "&.isBlue": {
          color: theme.palette.blue.main,
          "&:not(:disabled):hover": {
            color: theme.palette.blue.dark
          }
        }
      },
      "&--noPadding": {
        padding: "0!important"
      },
      "&--fluid": {
        minWidth: "auto"
      },
      "&--large": {
        minWidth: "89px"
      }
    }
  }
}));
