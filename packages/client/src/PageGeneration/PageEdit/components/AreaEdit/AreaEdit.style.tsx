import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "& .tabLine": {
      borderRadius: 3,
      boxSizing: "border-box",
      width: "100%",
      border: `1px solid ${theme.palette.grey.middle1}`,
      padding: "8px 19px",
      background: theme.palette.grey.light,
      display: "flex",
      cursor: "pointer",
      "& >*:first-child": {
        display: "flex",
        alignItems: "center",
        width: "calc(100% - 144px)"
      },
      "&__btnEdit": {
        alignItems: "center",
        display: "flex",
        "& > *": {
          marginRight: 8
        }
      },
      "&__container": {
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "calc(100% - 56px)",
        paddingRight: 24
      },
      "&--edited": {
        background: theme.palette.blue.light,
        borderColor: theme.palette.grey.middle1
      },
      "& + &": {
        borderTop: "none !important"
      },
      "&__input": {
        width: "calc(100% - 130px)",
        display: "none",
        marginLeft: 8
      },
      "& + .pageDetails__subTitle": {
        margin: "24px 0"
      },
      ".pageDetails__subTitle + & ": {
        margin: "14px 0 0 0"
      },
      "&--active": {
        background: theme.palette.blue.light,
        borderColor: theme.palette.blue.middle,
        "& .tabLine__btn": {
          "&--hover": {
            display: "none"
          },
          "&--visible": {
            display: "none"
          },
          "&--edit": {
            display: "block"
          }
        },
        "& .tabLine__input": {
          display: "block"
        },
        "& .tabLine__title": {
          display: "none"
        },
        "& .tabLine__container": {
          width: "auto"
        }
      },
      "&:not(.tabLine--active):hover": {
        background: theme.palette.blue.light,
        borderColor: theme.palette.blue.middle,
        "& .tabLine__btn": {
          "&--hover": {
            display: "block"
          },
          "&--edit": {
            display: "none"
          },
          "&--visible": {
            display: "flex"
          }
        }
      },
      "&__title": {
        paddingLeft: 12,
        fontFamily: "Open Sans",
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "38px"
      },
      "&__tag": {
        marginLeft: 11,
        width: "auto",
        textAlign: "center"
      },
      "&__btn:not(.tabLine__btn--visible)": {
        display: "none"
      }
    },
    "& .isOverflow": {
      height: "calc(100% - 105px)",
      overflowY: "auto",
      overflowX: "hidden",
      "& > *": {
        paddingRight: 5
      }
    },
    "& .noProduct": {
      textAlign: "center",
      "&__icon": {
        color: theme.palette.grey.middle1,
        fontSize: "100px",
        fontFamily: "Open Sans",
        fontWeight: 600
      },
      "&__txt": {
        color: theme.palette.grey.middle1,
        fontSize: 18,
        fontFamily: "Open Sans",
        fontWeight: 600,
        maxWidth: 300,
        lineHeight: "26px"
      }
    },
    "& .pagiantionImgs": {
      position: "absolute",
      bottom: 10,
      left: 0,
      height: 66,
      padding: " 0 42px",
      borderTop: `1px solid ${theme.palette.grey.middle1}`,
      background: theme.palette.white,
      zIndex: 5
    },
    "& .drop": {
      overflow: "hidden",
      /* drag a lexterieur de sa zone */
      "&--draggingFromThisWith": {
        background: "rgba(0, 0, 0, 0.01)"
      },
      /* drag a interieur de sa zone */
      "&--draggingOverWith, &--onSortOver": {
        background: "rgba(0, 0, 0, 0.02)"
      }
    },
    "& .snap": {
      position: "relative",
      zIndex: 5,

      "&--helper": {
        position: "relative",
        zIndex: 999
      },
      "& .cardImg": {
        border: `2px dashed ${theme.palette.blue.main}`,
        "&__title": {
          height: 36
        },
        "&__description": {
          height: 32
        }
      },
      borderRadius: 3,
      "&--dragging": {
        "& .cardImg": {
          border: `2px solid ${theme.palette.blue.main}`
        }
      },
      "&--dropAnimating": {
        "& .cardImg": {
          border: `2px dashed ${theme.palette.blue.main}`
        }
      }
    },
    "& .cardImgs": {
      marginLeft: "-12px",
      "&--noProduct": {
        height: "calc(100% - 105px)"
      },
      "& .falseZone": {
        position: "relative",
        "&::before": {
          borderRadius: 3,
          content: "''",
          background: theme.palette.grey.middle1,
          width: "100%",
          height: "100%",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0
        }
      },
      "& > *": {
        paddingBottom: 17,
        paddingTop: 24,
        paddingLeft: 12,
        paddingRight: 12
      }
    },
    "&.pageDetails": {
      position: "relative",
      width: "calc(100% - 290px)",
      scrollbarWidth: "thin",
      padding: "0px 42px 24px 42px",
      "&--paddingTop": {
        padding: "24px 42px 24px 42px"

      }
    },
    "& .pageDetails": {
      "&__checkAll": {
        fontSize: 14,
        "& > span.Mui-checked": {
          "& + span": {
            color: `${theme.palette.blue.main} !important`
          }
        }
      },
      "&__actions": {
        "& > *": {
          marginRight: 16,
          "&:last-child": {
            marginRight: 0
          }
        }
      },
      "&__container": {
        height: "100%"
      },
      "&__header": {
        marginBottom: 17,
        position: "sticky",
        top: 0,
        left: 42,
        zIndex: 15,
        background: theme.palette.white,
        padding: "10px 5px",
        minHeight: 70,
        "&--container": {
          position: "absolute",
          top: 0,
          left: -42,
          width: "calc(100% + 42px + 42px)",
          height: "auto",
          padding: "16.5px 42px",
          background: theme.palette.white,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)"
        }
      },
      "&__title": {
        fontFamily: "Open Sans",
        fontSize: 18,
        color: theme.palette.black,
        fontWeight: 600,
        textTransform: "capitalize",
        "&--mb": {
          marginBottom: 5
        },
        "&--mbTxt": {
          marginBottom: 24
        }
      },
      "&__subTitle": {
        fontFamily: "Open Sans",
        fontSize: 16,
        color: theme.palette.black,
        fontWeight: 600,
        textTransform: "capitalize"
      },
      "&__productTitle": {
        fontFamily: "Open Sans",
        fontSize: 14,
        color: theme.palette.black,
        fontWeight: 300
      },
      "&__endBtn": {
        marginTop: 16
      },
      "&__footer": {
        marginTop: 16
      }
    }
  }
}));
