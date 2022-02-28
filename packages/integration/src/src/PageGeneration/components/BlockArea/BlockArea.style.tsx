import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.blockArea": {
      "&.isActive": {
        border: `1px solid ${theme.palette.blue.dark}`,
        background: theme.palette.blue.light
      },
      borderRadius: 3,
      border: `1px solid ${theme.palette.grey.middle1}`,
      padding: "12px 12px 0px 12px",
      cursor: "pointer",
      marginBottom: 9,
      "&:last-child": {
        marginBottom: 0
      }
    },
    "& .blockArea": {
      "&__img": {
        borderRadius: 3,
        width: 82,
        height: 51,
        objectFit: "cover"
      },
      "&__header": {
        fontSize: 12,
        color: theme.palette.black,
        "&--bold": {
          fontWeight: 600
        }
      },
      "&__body": {
        paddingBottom: 16,
        paddingTop: 8,
        fontSize: 14,
        color: theme.palette.black,
        "& p": {
          maxWidth: "29ch"
        }
      },
      "&__footer": {
        height: 31,
        background: theme.palette.grey.light,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
        marginLeft: "-12px",
        padding: "0 12px",
        fontSize: 12,
        color: theme.palette.grey.dark,
        "&--container": {
          width: "100%"
        }
      },
      "&__progress": {
        marginTop: 5,
        "&--more": {
          "& > *": {
            background: theme.palette.green.main
          }
        },
        "&--neutral": {
          "& > *": {
            background: theme.palette.yellow.main
          }
        },
        "&--less": {
          "& > *": {
            background: theme.palette.yellow.main
          }
        }
      }
    }
  }
}));
