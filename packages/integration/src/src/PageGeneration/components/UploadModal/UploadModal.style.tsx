import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .dzu-dropzone": {
      "&.dzu-dropzoneActive": {
        background: theme.palette.blue.light,
        cursor: "move"
      }
    },
    "& .preview": {
      "&__container": {
        marginTop: 20,
        overflowX: "scroll",
        height: 168,
        paddingRight: 5,
        scrollbarWidth: "thin"
      },
      "&__line": {
        width: "100%",
        position: "absolute",
        height: 2,
        bottom: 0,
        left: 0,
        "&::after": {
          content: "''",
          display: "block",
          height: "100%",
          background: theme.palette.green.main,
          borderRadius: 2
        }
      },
      "&__data": {
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        paddingLeft: 12
      },
      "&__item": {
        position: "relative",
        padding: "12px 26px 12px 16px",
        borderRadius: 3,
        boxShadow: `0 1px 2px 0 ${theme.palette.grey.middle1}`,
        border: `solid 1px ${theme.palette.grey.middle1}`,
        backgroundColor: theme.palette.white,
        marginBottom: 8,
        "&--green": {
          background: theme.palette.green.main
        }
      },
      "&__img": {
        height: 44,
        width: 44,
        borderRadius: 5,
        "&--container": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      },
      "&__title": {
        fontFamily: "Open Sans",
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.black,
        marginBottom: 5
      },
      "&__info": {
        fontFamily: "Open Sans",
        fontSize: 12,
        color: theme.palette.grey.middle1
      },
      "&__icon": {
        height: 20,
        width: 20,
        marginLeft: 18
      },
      "&__right": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    "& .input": {
      border: `1px  dashed ${theme.palette.grey.middle1}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 250,
      padding: "0 !important",
      "&__title": {
        margin: "12px 0",
        fontFamily: "Open Sans",
        fontSize: 16,
        lineHeight: 1.5,
        color: theme.palette.black
      },
      "&__txt": {
        marginTop: 18,
        fontFamily: "Open Sans",
        fontSize: 12,
        color: "rgba(17, 24, 39, 0.6)"
      },
      "&__action": {
        background: theme.palette.blue.main,
        border: `1px solid ${theme.palette.blue.main}`,
        lineHeight: "35px",
        height: 36,
        fontSize: 14,
        color: "white",
        "&:hover": {
          background: theme.palette.blue.dark
        },
        "&:disabled": {
          background: theme.palette.grey.middle2,
          border: `1px solid ${theme.palette.grey.dark}`,
          color: theme.palette.white
        },
        width: 111,
        padding: "8px 16px",
        borderRadius: 3,
        cursor: "pointer"
      },
      "&__container": {
        textAlign: "center"
      }
    },
    "& .container": {
      "&__header": {
        padding: "0 24px",
        height: 60,
        borderBottom: `solid 1px ${theme.palette.grey.middle1}`,
        display: "flex"
      },
      "&__body": {
        padding: 24
      },
      "&__footer": {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "calc(100% - 48px)",
        padding: "0 24px",
        height: 67,
        borderTop: `solid 1px ${theme.palette.grey.middle1}`,
        display: "flex"
      }
    }
  },
  uploadModal: {
    width: "655px",
    minHeight: "432px",
    maxHeight: "583px",
    overflowY: "hidden",
    background: theme.palette.white,
    borderRadius: 3,
    boxSizing: "border-box",
    "&.NoPreview": {
      height: 432
    }
  }
}));
