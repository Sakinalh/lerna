import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => (
  {
    newFilters: {
      height: 38,
      lineHeight: "38px",
      fontFamily: "Open Sans",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 14,
      cursor: "pointer"
    },
    divider: {
      height: 40,
      marginRight: 10,
      marginLeft: 10,
      borderColor: theme.palette.blue.middle
    },
    root: {
      position: "relative",
      display: "flex",
      "&.analyticsFilters, & .analyticsFilters": {
        background: theme.palette.white,
        minHeight: 88,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
        padding: "18px 20px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 8,
        width: "100%",
        "&--wrapper": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        },
        "&.isExpanded": {
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          background: theme.palette.blue.light,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignContent: "center",
          minHeight: "calc(100vh - 150px)",
          "& .analyticsFilters__reduce": {
            position: "absolute",
            bottom: 0,
            height: 73,
            width: 73,
            background: theme.palette.primary.main,
            alignItems: "center",
            alignSelf: "center"
          },
          "& .analyticsFilters__search": {
            order: -1,
            marginBottom: 34,
            alignSelf: "center",
            "& .MuiInputBase-root": {
              height: 35
            }
          },
          "& .analyticsFilters__actions": {
            order: -1
          }
        },
        "&.analyticsFilters__filters": {
          display: "block",
          width: "100%",
          backgroundColor: "black"
        }
      },
      "&.isActif": {
        background: theme.palette.blue.light
      },

      "&__search": {
        width: "calc(100% - 125px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > *": {
          maxWidth: 529
        }
      },

      "&__more": {
        maxWidth: 348,
        background: theme.palette.grey.light,
        borderRadius: 3,
        height: 38,
        padding: "8px 15px 8px 15px",
        display: "inline-flex",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        cursor: "pointer",
        "&.isDisabled": {
          background: theme.palette.blue.middle,
          color: theme.palette.white
        },
        "&.isActif": {
          marginBottom: 14
        }
      }
    },
    "iconBtn": {
      height: 40,
      width: 40,
      alignSelf: "center",
      marginTop: 20
    },
    "filters": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%"
    },
    "BtnDots": {
      background: theme.palette.grey[200],
      borderRadius: 3,
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      height: 38,
      width: 38,
      marginTop: 10,
      marginRight: 12,
      cursor: "pointer"
    },
    "wrapper": {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    "asideBtns": {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 10
    },
    icon: {
      height: 30,
      width: 30
    },
    iconReset: {
      // space on icon
      height: 20,
      width: 20

    },
    svg: {
      height: 40,
      alignItems: "center",

      "& svg:nth-child(2)": {
        height: 40,
        fill: "red"
      }
    }
  }
));

export const useStylesModalTruncate = makeStyles(theme => (
  {
    root: {
      width: 208,
      padding: 16,
      background: theme.palette.white,
      border: "1px solid #E5E7EB",
      boxSizing: "border-box",
      borderRadius: 3
    },
    title: {
      paddingBottom: 7
    },
    formControlLabel: {
      paddingBottom: 12,
      "&:last-child": {
        paddingBottom: 0
      }
    }
  }
));

export const useStylesModalSave = makeStyles(theme => (
  {
    root: {
      display: "flex",
      color: theme.palette.black,
      flexDirection: "column",
      alignItems: "space-between",
      justifyContent: "flex-start",
      padding: "19px 0px 0px 0px"
    },
    title: {
      margin: "10px 22px 20px 22px"
    },
    label: {
      margin: "0px 22px 5px 22px"
    },
    input: {
      margin: "0px 22px 15px 22px",
      "& .MuiInputBase-root": {
        height: 35
      }
    },
    footer: {
      backgroundColor: theme.palette.grey.light,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: "10px",
      "& > *:first-child": {
        marginRight: 20
      }
    }
  }
));
