import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.analyticsCreateFilters, & .analyticsCreateFilters": {
      background: theme.palette.white,
      border: "1px solid #E2E2E2",
      boxSizing: "border-box",
      boxShadow: "0px 4px 8px 4px rgba(0, 0, 0, 0.05)",
      borderRadius: 4,
      width: 322,
      "&__header": {
        padding: "0 12px",
        height: 73,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiInputBase-root": {
          height: 35
        }
      },
      "&__body": {
        padding: 0,
        overflowY: "auto",
        maxHeight: 282,
        marginBottom: 20
      }
    },
    "& .accordionList": {
      "&__li": {
        height: 37,
        display: "block"
      },
      "&__a": {
        padding: "0 25px",
        boxSizing: "border-box",
        color: theme.palette.black,
        display: "block",
        textDecoration: "none",
        background: theme.palette.white,
        height: "100%",
        lineHeight: "37px",

        "&:hover": {
          background: theme.palette.grey.middle1
        }
      }
    },

    "& .accordion": {
      boxShadow: "none !important",
      "& .MuiAccordionSummary-root": {
        padding: "0 25px",
        minHeight: "37px !important",
        "&:hover": {
          background: theme.palette.grey.middle1
        },

        "&.Mui-expanded": {
          minHeight: "37px !important",
          margin: "0 !important"
        }
      },

      "& .MuiAccordionSummary-content": {
        color: theme.palette.black
      },

      "& .MuiAccordionDetails-root": {
        padding: 0
      },

      "&.Mui-expanded": {
        margin: "0 !important"
      }
    }
  }
}));
