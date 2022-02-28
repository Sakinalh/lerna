import { Palette } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .blockAreas": {
      height: "calc(100% - 120px)",
      overflowX: "hidden",
      overflowY: "auto",
      "&__container": {
        padding: "0 5px"
      }
    },
    "&.PageCardPreview": {
      width: "calc(33.33% - 8px)",
      marginRight: 8,
      height: "calc(100vh - 49px - 76px - 83px )",
      border: `solid 1px ${theme.palette.grey.middle1}`,
      background: theme.palette.white,
      position: "relative",
      "&--little": {
        width: "100%",
        marginRight: 0,
        maxHeight: 500
      },
      "&--keyWordsPage": {
        marginBottom: 24
      },
      "&--linked": {
        border: `solid 1px ${theme.palette.green.main}`,
        "&  .PageCardPreview__header": {
          background: theme.palette.green.main,
          borderBottom: `1px solid ${theme.palette.green.main}`
        },
        "&  .PageCardPreview__footer": {
          background: theme.palette.green.main,
          borderTop: `1px solid ${theme.palette.green.main}`
        }
      },
      "&--active": {
        border: `solid 1px ${theme.palette.blue.middle}`,
        "&  .PageCardPreview__header": {
          background: theme.palette.blue.middle,
          borderBottom: `1px solid ${theme.palette.blue.middle}`
        },
        "& .PageCardPreview__footer": {
          background: theme.palette.blue.middle,
          borderTop: `1px solid ${theme.palette.blue.middle}`
        }
      }
    },
    "& .PageCardPreview": {
      "&__header": {
        background: theme.palette.grey.extraExtraLight,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 8,
        // borderBottom: `solid 1px ${theme.palette.grey.middle1}`,
        width: "100%",
        position: "relative",
        "&--label": {
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        "&--preview": {
          position: "absolute",
          right: 12,
          textTransform: "uppercase",
          padding: 0,
          minWidth: "auto"
        }
      },
      "&__body": {
        height: "calc(100% - 83px)",
        padding: "10px 12px 15px 12px",
        "&--description": {
          paddingBottom: 12
        },
        "&--blockAreas": {}
      },
      "&__footer": {
        height: 52,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: `1px solid ${theme.palette.grey.middle1}`,
        background: theme.palette.grey.light,
        padding: "0 12px",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        boxSizing: "border-box"
      },
      "&__label": {
        fontSize: 12,
        color: theme.palette.black,
        fontFamily: "Open Sans",
        paddingBottom: 4
      },
      "&__title": {
        fontSize: 14,
        fontFamily: "Poppins",
        color: theme.palette.black,
        fontWeight: 600,
        marginBottom: 16,
        lineHeight: "16px",
        maxWidth: "29ch"
      },
      "&__pct": {
        fontWeight: 600,
        fontSize: 20,
        fontFamily: "Open Sans",
        "&--negative": {
          color: theme.palette.red.main
        },
        "&--neutral": {
          color: theme.palette.yellow.main
        },
        "&--positive": {
          color: theme.palette.green.main
        }
      },
      "&__link": {}
    },
    "& .header": {
      borderBottom: `1px solid ${theme.palette.grey.middle1}`,
      background: theme.palette.white,
      padding: "10px 16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      "&__btns": {
        "&>*:first-child": {
          marginRight: 16
        }
      },
      "&__title": {
        color: theme.palette.black
      },
      "&__back": {
        height: 34,
        width: 34,
        "& > span:first-child": {
          height: 34,
          width: 34
        }
      }
    },
    "& .asideKeywords": {
      height: "calc(100vh - 55px)",
      padding: "16px 15px",
      border: `1px solid ${theme.palette.grey.middle1}`,
      borderTop: "none",
      width: 257,
      "&__search": {
        marginBottom: 18,
        padding: "0 10px"
      },
      "&__filter": {
        marginBottom: 16
      }
    },
    "& .accordion": {
      "&__details": {
        padding: 0
      }
    },
    "& .keyAccordion": {
      "&.isOpen": {
        "& .keyAccordion__summary": {
          background: theme.palette.blue.light
        }
      },
      border: "none",
      boxShadow: "none",
      "&__summary": {
        minHeight: 0,
        padding: "6px 5px 6px 5px",
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: 500,
        color: theme.palette.black,
        "& > div": {
          margin: 0
        }
      }
    },
    "& .keywordsFilter": {
      "&.isOpen": {
        "& .keywordsFilter__container": {
          background: theme.palette.grey.light
        }
      },
      "&__container": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "transparent",
        marginRight: 5,
        paddingLeft: 5,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 2
      },
      "&__icon": {
        "& > span:first-child": {
          height: 28,
          width: 28
        },
        "& svg": {
          height: 14,
          width: 14
        }
      },
      "&__label": {
        textTransform: "uppercase",
        fontFamily: "Poppins",
        color: theme.palette.black,
        fontSize: 14,
        fontWeight: 400
      }
    },
    "& .dropdownIcon": {
      position: "relative",
      width: 17,
      height: "auto"
    },
    "& .keywords": {
      "&__li": {
        marginBottom: 20
      }
    }
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
  }
}));
