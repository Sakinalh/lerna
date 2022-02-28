import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    "&.skeleton, & .skeleton": {
      "&--noScale": {
        transform: "scale(1)!important"
      },

      "&--inline": {
        display: "inline-flex"
      }
    }
  }
});
