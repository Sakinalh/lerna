export const tooltips = theme => ({
  ".popover": {
    "&--error": {
      color: "white",
      background: "red",
      borderColor: "red",
      "&::before": {
        borderColor: "transparent red transparent transparent"
      },
      "& svg": {
        color: "white",
        fontSize: 21,
        marginRight: 4,
        alignSelf: "flex-start"
      },
      "& p": {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: 10,
        lineHeight: "14px"
      }
    },
    "&--noOverflow": {
      overflow: "visible"
    },
    "&--triangle": {
      position: "relative",
      "&Left": {
        marginTop: -22,
        marginLeft: 5,
        "&:before": {
          marginTop: 0,
          left: "-5px",
          borderWidth: "5px 5px 5px 0",
          borderColor: "transparent white transparent transparent"
        }
      },
      "&Bottom": {
        marginTop: -22,
        marginBottom: 5,
        "&:before": {
          left: "50%",
          transform: "translate(-50%,0%)",
          marginTop: 0,
          bottom: "-5px",
          borderWidth: "5px 5px 0px 5px",
          borderColor: "white transparent transparent transparent"
        }
      },
      "&NavFilter": {
        marginLeft: -5,
        marginTop: 10,
        "&:before": {
          top: -5,
          left: "calc(50% - 5px)",
          borderWidth: "0px 5px 5px 5px",
          borderColor: "transparent transparent white transparent"
        }
      },
      "&PopFilter": {
        marginLeft: -5,
        marginTop: 10,
        "&:before": {
          top: -5,
          left: "calc(50% - 5px)",
          borderWidth: "0px 5px 5px 5px",
          borderColor: "transparent transparent white transparent"
        }
      },
      "&:before": {
        content: '""',
        borderStyle: "solid",
        borderWidth: "5px 5px 5px 0",
        position: "absolute",
        left: "-5px"
      }
    },
    "& .filterDisplay": {
      width: 140,
      padding: 10,
      "&--flex": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      "&--error": {
      }
    },
    "& .filterPop": {
      width: 213,
      padding: 16,
      "& .filterPop__checkbox": {
        margin: "0 0 12px 0",
        "& >*:first-child": {
          marginRight: 15
        },
        "& >*:last-child": {
          fontSize: 14,
          textTransform: "capitalize",
          color: theme.palette.black
        },
        "&:last-child": {
          margin: "0 0 22px 0"
        }
      },

      "& .filterPop__checkbox--input": {
        "&.checkbox--focused ~ div  .filterPop__checkboxIcon--true": {
          display: "block"
        },
        "&.checkbox--focused  ~ div .filterPop__checkboxIcon--false": {
          display: "none"
        }
      },
      "&__checkboxIcon": {
        marginRight: 10,
        "&--true": {
          display: "none",
          color: "#397EF5"
        },
        "&--false": {
          display: "block",
          color: "#B6B6B6"
        }
      },
      "& .filterPop__title": {
        display: "block",
        marginBottom: 10,
        color: theme.palette.black
      },
      "& .filterPop__inputs": {
        display: "flex",
        marginBottom: 24,
        "& .filterPop__inputs--separator": {
          padding: "0 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Open Sans",
          fontSize: "14px",
          color: theme.palette.grey.dark
        },
        "& .filterPop__inputs--item": {
          width: "auto"
        }
      },
      "& .filterPop__btns": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& > *": {
          width: "calc(50% - 6px)"
        }
      }
    },
    "&--filterProd": {
      padding: "16px 12px",
      width: 272
    },
    "&--paper": {
      padding: 16,
      borderRadius: 3,
      border: `solid 1px ${theme.palette.grey.middle1}`,
      background: theme.palette.white
    }
  },
  ".list": {
    padding: 0,
    margin: 0,
    "& .list__item": {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: 500,
      "& .list__item--link": {
        display: "block",
        position: "relative",
        marginLeft: "-16px",
        width: "calc(100% + 32px)",
        padding: "6px 16px",
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
          background: theme.palette.blue.middle
        }
      }
    }
  },
  ".radio": {
    "&.isWhite": {
      "&.Mui-checked": {
        color: "white"
      }
    },
    "&.isBlue": {
      "&.Mui-checked": {
        color: "#397EF5"
      }
    },
    "&--little": {
      transform: "scale(0.59)"
    },
    padding: "0 !important"
  },
  ".label": {
    "&__login": {
      "&--root": {
        color: theme.palette.black
      },
      "&--error": {
        color: theme.palette.red.main
      },
      "&--focus": {
        color: `${theme.palette.black} !important`
      }
    },
    "&--simple": {
      cursor: "pointer",
      transform: "none !important",
      position: "relative",
      pointerEvents: "auto !important",
      fontFamily: "Open Sans",
      fontSize: 14,
      fontWeight: 600,
      "& + *": {
        marginTop: 8
      }
    },
    "&--select": {
      padding: "0 0 0 15px",
      transform: "none",
      fontSize: 14,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 38
    }
  },
  ".menu": {
    "& .ellipsis": {
      maxWidth: 100
    },
    "& li  > *": {
      display: "inline-block",
      marginRight: 5,
      "&:last-child": {
        marginRight: 0
      }
    }
  },
  // ".input": {
  //   paddingLeft: 12,
  //   paddingRight: 12,
  //   "& .input": {
  //     paddingLeft: 0,
  //     paddingRight: 0,
  //   },
  //   "&--noLegend": {
  //     "& legend": {
  //       display: "none !important",
  //     },
  //     "& label": {
  //       fontSize: 14,
  //       fontFamily: "Open Sans",
  //       padding: 0,
  //       top: "-3px",
  //       lineHeight: 1,
  //       "&.MuiFormLabel-filled": {
  //         display: "none !important",
  //       },
  //     },
  //     "& fieldset": {
  //       top: "0 !important",
  //     },
  //   },
  //   "&__outline": {
  //     "&--root": {
  //       background: theme.palette.white,
  //       border: `1px solid ${theme.palette.grey.light}`,
  //       color: theme.palette.black,
  //       fontFamily: "Open Sans",
  //       fontSize: 16,
  //       height: 38,
  //       "& button": {
  //         padding: 0,
  //         color: theme.palette.grey.dark,
  //       },
  //     },
  //     "&--icon": {
  //       "&  svg": {
  //         color: theme.palette.grey.middle1
  //       }
  //     },
  //     "&--focused": {
  //       background: theme.palette.white,
  //       border: `1px solid ${theme.palette.blue.main}`,
  //       color: theme.palette.black,
  //       "&.Mui-error": {
  //         border: `1px solid ${theme.palette.red.main} !important`,
  //       },
  //     },
  //     "&--disabled": {
  //       background: theme.palette.grey.light,
  //       border: `1px solid ${theme.palette.grey.light}`,
  //       cursor: "not-allowed",
  //     },
  //   },
  // },
  ".tooltip": {
    fontSize: 12,
    padding: "16px 10px",
    color: "white",
    fontFamily: "Open Sans",
    background: theme.palette.grey.middle1,
    "&__container": {
      boxSizing: "border-box",
      width: "100%",
      maxHeight: 125,
      overflowY: "auto",
      overflowX: "hidden",
      scrollbarWidth: "thin"
    }
  },
  ".popUp": {
    position: "absolute",
    background: theme.palette.white,
    width: 914,
    borderRadius: "3px",
    "&__close": {
      cursor: "pointer"
    },
    "&__title": {
      fontFamily: "Poppins",
      fontSize: 20,
      fontWeight: 500,
      color: theme.palette.grey.dark
    },
    "&__header": {
      boxSizing: "border-box",
      height: 60,
      padding: "0 16px",
      borderBottom: `1px solid ${theme.palette.grey.middle1}`
    },
    "&__footer": {
      height: 68,
      padding: "0 16px",
      borderTop: `1px solid ${theme.palette.grey.middle1}`,
      "& > .button": {
        marginRight: 16,
        "&:last-child": {
          marginRight: 0
        }
      }
    },
    "&--center": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  },
  ".dialog": {
    "&--paper": {
      width: 425,
      padding: "0 24px 24px 24px",
      background: theme.palette.white,
      borderRadius: 3
    },
    "&--noOverflow": {
      overflow: "visible",
      maxWidth: "none"
    },
    "&--fullscreen": {
      width: "calc(100% - 16px)",
      height: "calc(100% - 16px)",
      overflowY: "hidden",
      background: theme.palette.white,
      borderRadius: 3,
      boxSizing: "border-box"
    },
    "&Title": {
      "&--root": {
        fontFamily: "Open Sans",
        fontSize: 20,
        fontWeight: 600,
        color: theme.palette.grey.middle1,
        marginBottom: 24,
        display: "block",
        padding: 0
      }
    },
    "&Content": {
      "&--root": {
        padding: 0,
        overflowY: "hidden"
      },
      "&Txt": {
        "&--root": {
          fontFamily: "Open Sans",
          fontSize: 14,
          color: theme.palette.grey.middle1,
          display: "block",
          padding: 0,
          margin: 0
        },
        "&--paddingBottom": {
          marginBottom: 32
        }
      }
    }
  },
  ".error": {
    color: `${theme.palette.red.main} !important`,
    fontFamily: "Open Sans",
    fontSize: 12,
    marginLeft: 0,
    position: "absolute",
    bottom: 0,
    left: 0
  }
});