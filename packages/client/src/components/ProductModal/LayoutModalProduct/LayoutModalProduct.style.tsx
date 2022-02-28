import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    margin: "0 auto",
    fontSize: 10,
    contentVisibility: "auto",
    containIntrinsicSize: 3000,
    width: "100%",
    height: "100%",
    "&.container": {
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
            "& .container__products": {
              padding: "0  32px 0 32px"
            }
          }
        },
        "& .container__aside": {
          padding: "0 32px 0 24px",
          width: 320,
          borderRight: `1px solid ${theme.palette.grey.middle1}`
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
          borderBottom: `1px solid ${theme.palette.grey.middle1}`,
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
        "& .container__products": {
          marginTop: 13,
          marginRight: 5,
          padding: "0  54px 0 25px",
          overflowX: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "thin",
          height: "calc(100vh - 175px - 75px)"
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
              MaxWidth: "calc(100% / 5)"
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
