import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: isactif => ({
    height: 34,
    background: !isactif && theme.palette.grey.light
  }),
  label: isactif => ({
    fontFamily: "Open Sans",
    fontSize: "14px",
    color: isactif ? theme.palette.white : theme.palette.grey.dark,
    fontWeight: isactif ? 700 : 400
  })
}));
