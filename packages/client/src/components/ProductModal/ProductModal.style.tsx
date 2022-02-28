import makeStyles from "@mui/styles/makeStyles";
import { relative } from "path";
export const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    margin: "0 auto",
    fontSize: 10,
    contentVisibility: "auto",
    containIntrinsicSize: 3000,
    width: "100%",
    height: "100%",
    "& .cardImg": {
      "&__title": {
        display: "block",
        minHeight: 14
      }
    },
    "& .filterProd": {
      padding: "6px 12px",
      width: 272,
      "&__search": {
        marginBottom: 8,
        width: "100%"
      },
      "&__form": {
        width: "100%",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
        height: "auto",
        "&--container": {
          position: "absolute",
          width: "200%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
          transition: "0.25s transform"
        },
        "&--first": {
          width: "100%",
          boxSizing: "border-box",
          padding: "0 5px"
        },
        "&--second": {
          width: "100%",
          boxSizing: "border-box",
          padding: "0 5px"
        }
      },
      "&__header": {
        position: "relative",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 22,
        "& > *": {
          "&:first-child": {
            position: "absolute",
            left: 0,
            top: -3,
            width: 28,
            height: 28,
            color: theme.palette.black,
            cursor: "pointer"
          },
          "&:last-child": {
            fontSize: 14,
            fontWeight: 600,
            color: theme.palette.black,
            fontFamily: "Open Sans",
            textTransform: "capitalize"
          }
        }
      },
      "&__subTitle": {
        marginBottom: 8,
        color: theme.palette.black,
        textTransform: "capitalize"
      },
      "&__input": {
        marginBottom: 8,
        "& .MuiOutlinedInput-root": {
          height: 35
        }
      },
      "&__footer": {
        "& > .button": {
          marginRight: 16,
          "&:last-child": {
            marginRight: 0
          }
        }
      }
    },
    "& .filterSelect": {
      "&--operator": {},
      "&--value": {
        maxWidth: 100
      }
    },
    "& .filterNav": {
      "&--fakeBtn": {
        cursor: "pointer",
        boxSizing: "border-box",
        padding: "6px 8px",
        height: 34,
        color: "black",
        borderRadius: 3,
        boxShadow: `0 0 2px 0 ${theme.palette.blue.main}`,
        border: "solid 1px transparent",
        backgroundColor: `${theme.palette.white} !important`
      },
      "&__btn": {
        fontFamily: "Open Sans",
        fontSize: 14
      },
      "&__item": {
        fontFamily: "Open Sans",
        fontSize: 14,
        color: theme.palette.black,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > *": {
          marginRight: 2,
          "&:last-child": {
            marginRight: 0
          }
        },
        "&--strong": {
          color: theme.palette.blue.dark
        },
        "&--inside": {
          borderRadius: 3,
          padding: 5,
          background: theme.palette.grey.middle1,
          display: "flex",
          "& > *": {
            marginRight: 4,
            "&:last-child": {
              maxWidth: 100,
              marginRight: 0
            }
          }
        },
        "&--close": {
          fontSize: 17,
          padding: 0,
          "& > span > span": {
            display: "inline-block"
          }
        },
        "&--title": {
          textTransform: "capitalize"
        }
      },
      "&__form": {
        "&::before": {
          position: "absolute",
          content: "''",
          display: "block",
          width: 0,
          height: 0,
          top: -5,
          left: 30,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: `5px solid ${theme.palette.white}`,
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.06)"
        },
        minWidth: 272,
        position: "absolute",
        left: 15,
        bottom: -3,
        background: theme.palette.white,
        zIndex: 2,
        transform: "translate(0%, 100%)",
        padding: "19px 12px 16px 10px",
        borderRadius: 1,
        boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.06)",
        backgroundColor: theme.palette.white
      }
    },
    "&.container": {
      " & .container__header": {
        "&--close": {
          "& svg": {
            cursor: "pointer"
          }
        }
      },
      "&--action": {
        position: "relative",
        zIndex: 1,
        "& .container__body": {
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          "&--aside": {
            display: "flex",
            "& .container__footer": {
              transform: "translate(0%, -75px)"
            },
            "&__item": {
              height: 19,
              fontFamily: "Open Sans",
              fontSize: 14,
              color: theme.palette.black,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&--strong": {
                color: theme.palette.blue.dark
              },
              "&--close": {
                fontSize: 17,
                padding: 0,
                "& > span > span": {
                  display: "inline-block"
                }
              },
              "&--title": {
                textTransform: "capitalize"
              }
            },
            "& .container__products": {
              padding: "0  32px 0 32px"
            }
          }
        },
        "& .container__aside": {
          padding: "0 32px 0 24px",
          width: 320,
          borderRight: `solid 1px ${theme.palette.grey.middle1}`
        },
        "& .container__description": {
          padding: "16px 0",
          fontFamily: "Open Sans",
          fontSize: 16,
          fontWeight: 600,
          color: theme.palette.grey.middle1
        },
        "& .container__data": {
          position: "relative",
          width: "calc(100% - 320px)"
        },
        "& .container__header": {
          borderBottom: `solid 1px ${theme.palette.grey.middle1}`,
          background: theme.palette.white,
          padding: "10px 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 55,
          "&__btns": {
            "& > *:first-child": {
              marginRight: 16
            }
          },
          "&--recommendations": {
            display: "inline-flex",
            marginRight: 14,
            color: "rgba(35, 31, 32, 0.87)",
            fontFamily: "Open Sans",
            fontSize: 14
          },
          "&--title": {
            position: "relative",
            top: 2,
            paddingLeft: 12,
            color: theme.palette.grey.middle1
          },
          "&--back": {
            height: 34,
            width: 34,
            "& > span:first-child": {
              height: 34,
              width: 34
            }
          }
        },
        "& .container__filters": {
          "&--global": {
            position: "relative"
          },
          "&--actif": {
            position: "relative",
            maxWidth: "calc(100% - 193px)",
            display: "flex",
            flexWrap: "wrap",
            height: "44px",
            alignItems: "center",
            marginBottom: "0px !important",
            marginRight: "0px !important",
            "& > *": {
              marginBottom: 9,
              marginRight: 8
            }
          },
          "&--wrapper": {
            height: 52,
            position: "relative",
            overflow: "hidden",
            background: theme.palette.grey.light,
            transition: "all 0.25s",
            "&.isToggleMoreFilter": {
              height: "auto",
              overflow: "visible",
              transition: "all 0.25s",
              "& .container__filters--actif": {
                maxWidth: "100%",
                height: "auto"
              }
            }
          },
          height: "100%",
          minHeight: 52,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "7px 15px 0 15px",
          flexWrap: "wrap",
          overflow: "hidden",
          "&.isDisplay": {
            overflow: "hidden"
          },
          "& >*": {
            position: "relative",
            marginRight: 8,
            marginBottom: 9,
            "&:last-child": {
              marginRight: 0
            }
          }
        },
        "& .container__products": {
          marginTop: 13,
          marginRight: 5,
          padding: "0  54px 0 25px",
          overflowX: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "thin",
          height: "calc(100vh - 175px - 75px)",
          "&--error": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "& svg": {
              color: theme.palette.grey.middle1,
              fontSize: "146px",
              fontFamily: "Open Sans",
              fontWeight: 600
            },
            "& p": {
              color: theme.palette.grey.middle1,
              fontSize: 18,
              fontFamily: "Open Sans",
              fontWeight: 600,
              lineHeight: "26px"
            }
          }
        },
        "& .container__footer": {
          position: "absolute",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          bottom: 0,
          left: 0,
          height: 67,
          width: "100%",
          background: theme.palette.white,
          padding: 24,
          boxSizing: "border-box",
          borderTop: `1px solid ${theme.palette.grey.middle1}`,
          "&--txt": {
            fontFamily: "Open Sans",
            fontSize: 14,
            color: theme.palette.black
          }
        },
        "& .container__gridProduct": {
          "&--5": {
            "& .MuiGrid-item": {
              flexBasis: "calc(100% / 5)",
              maxWidth: "calc(100% / 5)"
            }
          },
          "&--4": {
            "& .MuiGrid-item": {
              flexBasis: "calc(100% / 4)",
              MaxWidth: "calc(100% / 4)"
            }
          }
        },
        "& .container__btns": {
          "& > button": {
            "&:first-child": {
              marginRight: 16
            }
          }
        },
        "& .container__right": {
          "&--elem": {
            "& > *:first-child": {
              marginRight: 24
            }
          }
        }
      }
    }
  }
}));
