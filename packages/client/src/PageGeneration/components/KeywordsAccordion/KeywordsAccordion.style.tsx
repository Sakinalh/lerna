import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({

  root: {
    "& .accordionSummary": {
      "&__expandIconWrapper": {
        "&--keyAccordion": {
          alignSelf: "flex-start",
          position: "relative",
          top: 8,
          left: -2
        }
      }
    },
    "&.keyAccordion": {
      position: "relative",
      border: "none",
      boxShadow: "none",
      "&:after": {
        position: "absolute",
        bottom: 1,
        left: 0,
        content: "''",
        width: "100%",
        height: 1,
        background: theme.palette.grey.middle1
      },
      "&.isOpen": {
        margin: "0px",
        "& .keyAccordion__summaryItem--searchBar": {
          display: "flex",
          marginTop: 11,
          marginBottom: 7
        }
      }
    },
    "& .accordion": {
      "&__details": {
        padding: 0,
        "&--queue": {
          padding: "10px 16px 16px 16px"
        }

      }
    },
    "& .keyAccordion": {
      "&__summaryItem": {
        "&--naming": {
          borderLeft: `5px solid ${theme.palette.blue.middle}`,
          borderRadius: 3
        },
        "&--searchBar": {
          "& .MuiOutlinedInput-root": {
            height: 35,
            width: "100%"
          },
          display: "none",
          marginTop: 0,
          marginBottom: 0
        }
      },
      "&__summaryCheckbox": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: -5,
        top: 0,
        height: "100%",
        transform: "translateX(-100%)",
        minHeight: 35,
        background: theme.palette.blue.middle,
        borderRadius: 0,
        transition: "0.25s all",
        "&--remove": {
          borderLeft: `5px solid ${theme.palette.grey.middle2} !important`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 35,
          paddingLeft: 35,
          "& .keyAccordion__summaryCheckbox--container": {
            display: "none"
          }
        },
        "&--linked": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 35,
          paddingLeft: 35,
          "& .keyAccordion__summaryCheckbox--container": {
            display: "none"
          }
        },
        "&--container": {
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 35,
          "&:hover .keyAccordion__summaryCheckbox,&.keyAccordion__summaryCheckbox--check .keyAccordion__summaryCheckbox": {
            transform: "translateX(0%)",
            transition: "0.25s all"
          },
          "& .beforeCheckBox": {
            content: "''",
            zIndex: "-1",
            width: "100%",
            height: "100%",
            borderRadius: 0
          }
        },
        cursor: "pointer"
      },
      "&__filtersSummary": {
        position: "relative",
        "&--round": {
          height: 9,
          width: 9,
          background: theme.palette.blue.main,
          position: "absolute",
          top: -9.5,
          right: 0,
          transform: " translateX(50%)",
          borderRadius: "50%"
        }
      },
      "&__summary": {
        borderRadius: "5px 0 0 5px",
        "&.Mui-focusVisible": {
          background: `${theme.palette.white} !important`
        },
        "&--checkboxWrapper": {
          position: "relative",
          zIndex: 2,
          width: 28,
          marginRight: 8,
          cursor: "pointer",
          height: "100%",
          display: "flex",
          background: theme.palette.blue.middle,
          minHeight: 35,
          transition: "0.25s all",
          alignItems: "center",
          justifyContent: "center"
        },
        "&--checkbox": {
        },
        minHeight: 0,
        boxSizing: "border-box",
        padding: "3px 0px 5px 0px",
        "& > div": {
          margin: 0,
          "& p": {
            fontFamily: "Poppins",
            fontSize: 14,
            color: theme.palette.black,
            fontWeight: 500
          }
        },
        "&--filters": {
          position: "absolute",
          right: 4
        }
      }
    },
    "& .dropdownIcon": {
      position: "relative",
      width: 17,
      height: "auto"
    },
    "& .keywords": {
      overflowY: "auto",
      maxHeight: "calc(100vh - 490px)",
      paddingRight: 5,
      scrollbarWidth: "thin",
      "&__kwdBtns": {
        boxSizing: "border-box",
        paddingTop: 13,
        paddingBottom: 10,
        "& > button": {
          "&:first-child": {
            marginRight: 8
          }
        }
      },
      "&__li": {
        marginBottom: 4
      }
    }
  }
}));
