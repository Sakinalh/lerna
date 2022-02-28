import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiInputBase-root": {
      height: 35
    },
    "& .list": {
      "& .list__container": {
        overflowY: "scroll",
        overflowX: "hidden",
        scrollbarWidth: "thin"
      },
      "&--filter": {
        "& .list__container": {
          height: 230,
          paddingRight: 5
        },
        "& .list__item": {
          "& + .list__item .list__item--title": {
            marginTop: 5,
            borderTop: `solid 1px ${theme.palette.grey.middle1}`
          },
          "&--title": {
            borderTop: "solid 1px transparent",
            borderRight: "solid 1px transparent",
            borderLeft: "solid 1px transparent",
            borderBottom: "solid 1px transparent",
            height: 35,
            lineHeight: "35px",
            display: "block",
            paddingLeft: 8,
            borderRadius: 3,
            textDecoration: "none",
            fontFamily: "Open Sans",
            fontSize: 12,
            fontWeight: 600,
            color: theme.palette.grey.middle1,
            textTransform: "uppercase"
          },
          "&--a": {
            height: 35,
            lineHeight: "35px",
            display: "block",
            paddingLeft: 8,
            borderRadius: 3,
            textDecoration: "none",
            fontFamily: "Open Sans",
            fontSize: 14,
            color: theme.palette.black,
            border: "1px solid transparent",
            "&:hover": {
              background: theme.palette.blue.light,
              color: theme.palette.blue.dark,
              border: `1px solid ${theme.palette.blue.middle}`
            }
          }
        }
      }
    }
  }
}));
