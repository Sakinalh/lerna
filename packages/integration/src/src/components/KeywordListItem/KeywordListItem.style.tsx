import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 44,
    padding: "0px 10px 0px 0px",
    borderLeft: `5px solid ${theme.palette.blue.middle}`,
    position: "relative",
    overflow: "hidden",
    "&.isSelected": {
      background: theme.palette.blue.light,
      borderRadius: 3,
      border: `1px solid ${theme.palette.blue.middle}`,
      borderLeft: `5px solid ${theme.palette.blue.middle}`,
      "&  label > span:last-child": {
        color: theme.palette.blue.dark
      }
    },
    "& .keyword": {
      width: "100%",
      "&__checkbox": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: -5,
        top: 0,
        minWidth: 28,
        height: "100%",
        transform: "translateX(-100%)",
        minHeight: 35,
        background: theme.palette.blue.middle,
        borderRadius: 0,
        transition: "0.25s all",
        "&--container": {
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 28,
          minHeight: 35,
          "&:hover .keyword__checkbox,&.isCheckedToBePublished .keyword__checkbox": {
            transform: "translateX(0%)",
            transition: "0.25s all"
          },
          "&.isCheckedToBePublished + .keyword__label": {
            "& .keyword__label--txt": {
              color: theme.palette.primary.dark
            }

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
      "&__label": {
        margin: 0,
        paddingRight: 5,
        paddingLeft: 6,
        paddingBottom: 5,
        paddingTop: 5,
        display: "flex",
        alignItems: "center",
        height: 35,
        cursor: "pointer",
        "&--linked": {
          paddingLeft: 24
        },
        "&--txt": {
          fontSize: 14,
          fontFamily: "open Sans",
          lineHeight: "18px",
          color: theme.palette.black,
          paddingRight: 25,
          width: "34ch"
        },
        "& > span:first-child": {
          marginRight: 10,
          alignSelf: "flex-start"
        }
      },
      "&__number": {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.grey.dark,
        fontSize: 10,
        zIndex: 1,
        fontFamily: "Open Sans",
        fontWeight: 600,
        height: 19,
        width: 19,
        "&:before": {
          content: '""',
          display: "block",
          background: theme.palette.grey.light,
          height: 19,
          width: 19,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: -1
        }
      }
    }
  }
}));
