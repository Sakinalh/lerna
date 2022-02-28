import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  dialog: {
    width: 458,
    padding: 0
  },
  root: {
    "&.loaderLinkModal, & .loaderLinkModal": {
      "& .container, &.container": {
        "&__btns": {
          "& > *": {
            marginRight: 16,
            "&:last-child": {
              marginRight: 0
            }
          }
        },
        "&__stepper": {
          width: "calc(100% - 24px)",
          "&--wrapper": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        },
        "&__header": {
          padding: "30px 30px",
          display: "flex",
          "&--close": {
            alignSelf: "flex-start"
          }
        },
        "&__loadingTitle": {
          color: theme.palette.grey.dark,
          display: "inline-block"
        },
        "&__loadingTxt": {
          marginBottom: 32,
          display: "inline-block"
        },
        "&__body": {
          padding: "32px 40px 32px 40px",
          "&--error": {
            padding: "0px 40px 0px 40px"
          },
          "&--abort": {
            padding: "32px 40px 32px 40px",
            "& p": {
              fontSize: 14,
              lineHeight: "19px",
              "& strong": {
                fontWeight: "800"
              },
              "&:last-child": {
                marginTop: "32px"
              }
            }
          },
          "&.isLoading": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }
        },
        "&__footer": {
          "&--white": {
            background: theme.palette.white
          },
          padding: "0 30px",
          height: 79,
          background: theme.palette.grey.light,
          display: "flex"
        }
      },
      "&__body": {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
      },
      "& .closeIcon": {
        cursor: "pointer",
        transition: "0.25s all",
        height: 30,
        fontSize: 23,
        color: theme.palette.grey.middle2,
        transform: "scale(1.5)",
        "&:hover": {
          opacity: 0.9,
          transform: "scale(1.1)"
        },
        "&:active": {
          opacity: 0.9,
          transform: "scale(1)"
        }
      },
      "&__title": {
        color: theme.palette.grey.dark,
        display: "inline-block"
      },
      "&__Success": {
        color: theme.palette.green.main,
        fontSize: 100
      },
      "&__Error": {
        color: "red",
        fontSize: 100,
        marginBottom: 0
      },
      "&__loaders": {
        marginBottom: 36,
        position: "relative",
        "&--item": {
        },
        "&--top": {
          color: theme.palette.blue.main,
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          animation: "spin 4s linear infinite"
        },
        "&--bottom": {
          color: theme.palette.grey.middle1
        },
        "&--circle": {
          strokeLinecap: "round"
        }
      },
      "&__txt": {
        marginBottom: 32,
        display: "inline-block"
      },
      "&__groupInput": {
        marginBottom: 24,
        "&--half": {
          "& > *": {
            width: "calc(50% - 9px)"
          }
        },
        "&--inline": {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          "& > *": {
            width: "calc(50% - 9px)"
          }
        }
      }
    },
    "&.linkToAdwordsModal, & .linkToAdwordsModal": {
      "& .container, &.container": {
        "&__btns": {
          "& > *": {
            marginRight: 16,
            "&:last-child": {
              marginRight: 0
            }
          }
        },
        "&__stepper": {
          width: "calc(100% - 24px)",
          "&--wrapper": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        },
        "&__header": {
          padding: "30px 30px",
          display: "flex",
          "&--close": {
            alignSelf: "flex-start"
          }
        },
        "&__body": {
          padding: "0px 35px 40px 35px"
        },
        "&__footer": {
          padding: "0 30px",
          height: 79,
          display: "flex",
          background: theme.palette.grey.light
        }
      },
      "& .closeIcon": {
        cursor: "pointer",
        transition: "0.25s all",
        fontSize: 23,
        color: theme.palette.grey.middle2,
        transform: "scale(1.5)",
        "&:hover": {
          opacity: 0.9,
          transform: "scale(1.1)"
        },
        "&:active": {
          opacity: 0.9,
          transform: "scale(1)"
        }
      },
      "&__title": {
        marginBottom: 11,
        marginRight: 20,
        color: theme.palette.black
      },
      "&__subTitle": {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: "19.07px",
        fontFamily: "Open Sans",
        color: theme.palette.grey.dark
      },
      "&__txt": {
        fontFamily: "Open Sans",
        fontSize: 14,
        lineHeight: "19.07px",
        color: theme.palette.grey.dark,
        marginBottom: 32
      },
      "&__groupInput": {
        marginBottom: 24,
        "&--half": {
          "& > *": {
            width: "calc(50% - 9px)"
          }
        },
        "&--inline": {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          "& > *": {
            width: "calc(50% - 9px)"
          }
        }
      }
    },
    "&.campaignModal, & .campaignModal": {
      "& .container, &.container": {
        "&__btns": {
          "& > *": {
            marginRight: 16,
            "&:last-child": {
              marginRight: 0
            }
          }
        },
        "&__stepper": {
          width: "calc(100% - 24px)",
          "&--wrapper": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        },
        "&__header": {
          padding: "30px 30px",
          display: "flex",
          "&--close": {
            alignSelf: "flex-start"
          }
        },
        "&__loadingTitle": {
          color: theme.palette.grey.dark,
          display: "inline-block"
        },
        "&__loadingTxt": {
          marginBottom: 32,
          display: "inline-block"
        },
        "&__body": {
          padding: "0px 30px 40px 30px",
          "&.isLoading": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }
        },
        "&__footer": {
          padding: "0 30px",
          height: 79,
          background: theme.palette.grey.light,
          display: "flex"
        }
      },
      "& .closeIcon": {
        cursor: "pointer",
        transition: "0.25s all",
        fontSize: 23,
        color: theme.palette.grey.middle2,
        transform: "scale(1.5)",
        "&:hover": {
          opacity: 0.9,
          transform: "scale(1.1)"
        },
        "&:active": {
          opacity: 0.9,
          transform: "scale(1)"
        }
      },
      "&__title": {
        marginBottom: 17,
        color: theme.palette.black
      },
      "&__subTitle": {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.43,
        fontFamily: "Open Sans",
        color: theme.palette.grey.dark
      },
      "&__txt": {
        fontFamily: "Open Sans",
        fontSize: 14,
        lineHeight: 1.43,
        color: theme.palette.grey.dark,
        marginBottom: 32
      },
      "&__loaders": {
        marginBottom: 36,
        position: "relative",
        "&--item": {
        },
        "&--top": {
          color: theme.palette.blue.main,
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          animation: "spin 4s linear infinite"
        },
        "&--bottom": {
          // Cant change here outside theme
          color: "#F2F2F2"
        },
        "&--circle": {
          strokeLinecap: "round"
        }
      },
      "&__groupInput": {
        marginBottom: 24,
        "&--inline": {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "row",
          "& > *": {
            width: "calc(50% - 9px)"
          }
        }
      }
    }
  }
}));
