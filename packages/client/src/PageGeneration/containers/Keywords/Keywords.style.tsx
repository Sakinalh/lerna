import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    margin: "0 auto",
    fontSize: 10,
    contentVisibility: "auto",
    containIntrinsicSize: 3000,
    width: "100%",
    "& .noPageCards": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      "&__icon": {
        color: theme.palette.grey.middle1,
        fontSize: 146,
        marginBottom: 10
      },
      "&__txt": {
        color: theme.palette.grey.middle1
      }
    },
    "& .container": {
      "&--aside": {
        "& .container__item:first-child": {
          height: "calc(100vh - 76px)",
          padding: "14px 9px 27.5px 15px",
          border: `1px solid ${theme.palette.grey.light}`,
          borderTop: "none",
          maxWidth: 256,
          boxSizing: "border-box"
        },
        "& .container__item:last-child": {
          background: theme.palette.grey.light,
          flex: "1 1 auto",
          padding: "0 20px"
        }
      }
    },
    "& .header": {
      borderBottom: `1px solid ${theme.palette.grey.middle1}`,
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
      "&__title": {
        color: theme.palette.black
      },
      "&__back": {
        height: 34,
        width: 34,
        zIndex: 1,
        "& > span:first-child": {
          height: 34,
          width: 34,
          position: "relative",
          "& &::after": {
            background: theme.palette.red.main,
            width: "100%",
            height: "100%",
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 50
          }
        }
      }
    }
  },
  popover: {
    pointerEvents: "none"
  },
  currentCampaignName: {
    lineHeight: "34px",
    height: 34,
    textTransform: "capitalize",
    display: "inline-block",
    position: "relative", top: 2
  }
}));
