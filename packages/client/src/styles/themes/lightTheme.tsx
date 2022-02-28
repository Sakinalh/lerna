import { createTheme } from "@mui/material/styles";
import { APP_THEME } from "../themes/commonTheme";

export const lightTheme = createTheme({
  ...APP_THEME,
  ...{
    palette: {
      ...APP_THEME.palette,
      mode: "light"
    }
  },
  zIndex: {
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }

      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: APP_THEME.palette.grey.middle1,
          borderRadius: 5,
          height: 2
        }
      }
    },
    MuiSlider: {
      styleOverrides: {

        root: {
          color: APP_THEME.palette.blue.main,
          height: "4px",

          "&.Mui-disabled": {
            "& .MuiSlider-valueLabelCircle": {
              background: APP_THEME.palette.grey.light
            },
            "& .MuiSlider-valueLabel::before": {
              borderTop: `calc(12px / 2) solid ${APP_THEME.palette.grey.light}`
            }
          }
        },
        valueLabel: {
          position: "relative",
          zIndex: 1,
          left: 0,
          paddingLeft: 0,
          paddingRight: 0,
          "&.MuiSlider-valueLabelOpen": {
            top: 0,
            transform: "scale(-1) translateY(3px)",
            overflow: "visible",
            background: "none"
          },
          "&::before": {
            zIndex: -1,
            position: "absolute",
            display: "block",
            content: "''",
            width: 0,
            height: 0,
            borderLeft: "calc(12px / 2) solid transparent",
            borderRight: "calc(12px / 2) solid transparent",
            borderTop: `calc(12px / 2) solid ${APP_THEME.palette.blue.main}`,
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 100%)"
          },
          "& .MuiSlider-valueLabelCircle": {
            position: "relative",
            background: APP_THEME.palette.blue.main,
            transform: "rotate(0deg) translate(0%, 5px) ",
            width: 57,
            height: 34,
            borderRadius: "1px"

          },
          "& .MuiSlider-valueLabelLabel": {
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%) rotate(-180deg)"

          }

        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: `${APP_THEME.palette.blue.light} !important`
            },
            "&.Mui-selected": {
              "& .Mui-checked": {
                color: `${APP_THEME.palette.white} !important`
              },
              backgroundColor: APP_THEME.palette.blue.main,
              color: APP_THEME.palette.white,
              "&:hover": {
                backgroundColor: `${APP_THEME.palette.blue.dark} !important`,
                color: APP_THEME.palette.white
              }
            }
          }
        },
        padding: {
          paddingTop: 5,
          paddingBottom: 5
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "33px !important",
          fontSize: 14,
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "normal"
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          position: "relative",
          top: 0,
          left: 4
        },
        filled: {
          "&:focus": {
            backgroundColor: " none !important",
            "&:hover": {
              backgroundColor: " none !important"
            }
          }
        },
        outlined: {
          "&:focus": {
            backgroundColor: APP_THEME.palette.grey.light,
            "&:hover": {
              backgroundColor: `${APP_THEME.palette.grey.light} !important`
            }
          }

        },
        select: {
          paddingLeft: 0,
          paddingRight: "0 !important",
          borderRadius: 3,
          "&.MuiOutlinedInput-input": {
            paddingTop: "0 !important",
            paddingBottom: "0 !important"
          },
          "& > *": {
            "&:last-child": {
              marginRight: 0
            }
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          color: APP_THEME.palette.black,
          fontFamily: "Open Sans",
          fontSize: 14
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        colorPrimary: {
          color: `${APP_THEME.palette.grey.middle1} !important`,
          "&.Mui-checked": {
            color: `${APP_THEME.palette.blue.main} !important`
          }
        },
        colorSecondary: {
          color: `${APP_THEME.palette.white} !important`,
          "&.Mui-checked": {
            color: `${APP_THEME.palette.white} !important`
          }
        },
        root: {
          padding: "0 !important",
          "& .MuiSvgIcon-fontSizeSmall": {
            fontSize: 14
          },
          "& .MuiInputBase-root": {
            marginTop: 10
          },

          "& + .MuiListItemText-root": {
            marginLeft: 11
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          padding: 0,
          "&.isLabel": {
            marginTop: 20,
            "& .MuiInputBase-root": {
              marginTop: 10
            }
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginRight: 0,
          marginLeft: 0,
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 14,
          lineHeight: "19px"
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 14,
          lineHeight: "19px"
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          background: "none !important",
          height: "auto",
          padding: "0 2px",
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 14,
          color: `${APP_THEME.palette.black} !important`
        },
        root: {
          background: "none !important",
          borderBottom: `2px solid ${APP_THEME.palette.grey.middle1}`,
          "&.MuiOutlinedInput-adornedStart": {
            paddingLeft: "8px",
            paddingRight: "8px"
          },
          paddingLeft: "4px",
          paddingRight: "4px",
          "&:hover": {
            background: "none !important",
            "& .MuiOutlinedInput-notchedOutline": {
              borderBottom: "2px solid transparent",
              boxShadow: "none!important"
            }
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none! important",
              boxShadow: "none!important"
            },
            background: "none !important",
            borderBottom: `2px solid ${APP_THEME.palette.blue.main} !important`,
            boxShadow: "none!important"
          },
          "&.Mui-error": {
            background: "none !important",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none! important",
              boxShadow: "none!important"
            },
            borderBottom: `2px solid ${APP_THEME.palette.red.main}`
          }

        }

      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          marginRight: 0
        }

      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          top: 0,
          borderWidth: "2px",
          borderColor: "transparent",
          "& legend": {
            display: "none !important"
          }
        },
        adornedStart: {
          color: APP_THEME.palette.grey.middle1,
          "& .MuiIconButton-root": {
            "&:hover": {
              backgroundColor: "transparent"
            },
            padding: "6px 0 6px 6px",
            "& svg": {
              width: 23,
              height: "auto"
            }
          }
        },
        adornedEnd: {
          color: APP_THEME.palette.grey.middle1
        },
        root: {
          "&.MuiOutlinedInput-adornedStart": {
            padding: "0 8px"
          },
          padding: "0 4px",
          background: APP_THEME.palette.grey.light,
          borderRadius: 3,
          border: "2px solid transparent",
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid transparent",
              boxShadow: "none!important"
            }
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none! important",
              boxShadow: "none!important"
            },
            background: APP_THEME.palette.grey.light,
            border: `2px solid ${APP_THEME.palette.blue.main} !important`,
            boxShadow: "none!important"
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none! important",
              boxShadow: "none!important"
            },
            background: APP_THEME.palette.grey.light,
            border: `2px solid ${APP_THEME.palette.red.main}`
          }
        },
        input: {
          height: "auto",
          padding: "0 12px",
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 14,
          color: `${APP_THEME.palette.black} !important`
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            backgroundColor: "inherit"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          fontSize: 10 // had to set hardcoded font to reach menu item. not available in global scope
        },
        paper: {
          boxShadow: APP_THEME.shape.objectShadow.boxShadowPopOver
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
          backgroundColor: "transparent"
        },
        input: {
          borderRadius: "4px"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          outlined: {
          }
        },
        root: {
          transform: "translate(0px, -15px) scale(1) !important",
          marginBottom: "10",
          color: APP_THEME.palette.black,
          display: "block",
          "&:first-letter": {
            textTransform: "capitalize"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-contained:disabled": {
            backgroundColor: `${APP_THEME.palette.grey.middle2} !important`,
            color: APP_THEME.palette.white
          }
        }
      }
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          height: 40
        }
      }
    },
    // @ts-ignore
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          height: "20px !important",
          border: 0
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 0,
          textTransform: "inherit"
        },
        label: {
          fontSize: "inherit"
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          // backgroundColor: "white"
        },
        tooltip: {
          // backgroundColor: "white"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${APP_THEME.palette.grey.middle1}`
        },
        head: {
          padding: 22,
          background: APP_THEME.palette.grey.extraExtraLight,
          color: APP_THEME.palette.grey.dark,
          textTransform: "capitalize"
        },
        body: {
          padding: 36
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            background: APP_THEME.palette.blue.light
          },
          "&.Mui-selected:hover": {
            background: APP_THEME.palette.blue.light
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          background: `${APP_THEME.palette.grey.light} !important`,
          color: `${APP_THEME.palette.grey.dark} !important`
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          fontSize: 14,
          border: "1px solid transparent",
          backgroundColor: "transparent",
          borderRadius: 2,
          height: 24,
          minWidth: 24,

          "&.Mui-selected": {
            border: `1px solid ${APP_THEME.palette.blue.main}`,
            color: APP_THEME.palette.blue.main,
            backgroundColor: "transparent !important"
          },
          "&.Mui-disabled": {
            color: APP_THEME.palette.grey.middle1
          }
        },
        icon: {
          fontSize: 14,
          color: APP_THEME.palette.blue.main,
          "&.Mui-disabled": {
            color: APP_THEME.palette.grey.middle1
          }
        }
      }

    }
  }
});
