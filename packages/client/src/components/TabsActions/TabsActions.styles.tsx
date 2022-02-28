import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  indicator: {
    backgroundColor: theme.palette.blue.main,
    height: "4px",
    bottom: "0px",
    paddingTop: 0,
    "&:before": {
      content: '""',
      display: "block",
      height: 4,
      width: (props: any) => props.type === "menuRecommandation" ? "30px" : "25%",
      background: (props: any) => props.type === "menuRecommandation" ? theme.palette.blue.light : theme.palette.white,
      position: "absolute",
      bottom: 0,
      left: 0
    },
    "&:after": {
      content: '""',
      display: "block",
      height: 4,
      width: (props: any) => props.type === "menuRecommandation" ? 0 : "25%",
      background: (props: any) => props.type === "menuRecommandation" ? theme.palette.blue.light : theme.palette.white, position: "absolute",
      bottom: 0,
      right: 0
    }
  },
  root: {
    borderBottom: (props: any) => props.type === "menuTab" || props.type !== "menuDashboard" && props.type !== "menuRecommandation" ? "1px solid #E5E7EB" : "1px solid transparent",
    backgroundColor: (props: any) => props.type === "menuTab" || props.type === "menuDashboard" || props.type === "menuRecommandation" ? "transparent" : theme.palette.blue.dark,
    boxShadow: (props: any) => props.type === "menuTab" || props.type === "menuDashboard" || props.type === "menuRecommandation" ? "transparent" : theme.shape.objectShadow.boxShadowAll,
    marginLeft: -1,
    position: "relative",
    zIndex: 8,
    color: (props: any) => props.type === "menuTab" || props.type === "menuDashboard" || props.type === "menuRecommandation" ? theme.palette.black : theme.palette.white },
  tab: {
    minWidth: (props: any) => props.type === "menuRecommandation" ? "auto" : 160,
    marginRight: (props: any) => props.type === "menuRecommandation" ? 24 : 0,
    minHeight: (props: any) => props.type === "menuRecommandation" ? 42: 72,
    position: "relative",
    textTransform: "capitalize",
    fontWeight: (props: any) => props.type === "menuRecommandation" ? 600: 400,
    fontSize: (props: any) => props.type === "menuTab" || props.type === "menuDashboard" || props.type === "menuRecommandation" ? "16px" : ".9em",
    alignItems: "center",
    justifyContent: (props: any) => props.type === "menuRecommandation" ? "flex-start" : "center",
    display: "flex",
    flexDirection: "row",
    padding: 0,
    "& svg": {
      fontSize: (props: any) => props.type === "menuRecommandation" ? 30 : "1em",
      fill: (props: any) => props.type === "menuRecommandation" && theme.palette.blue.main
    },
    "&:last-child": {
      marginRight: 0
    }
  },
  selected: {
    position: "relative",
    backgroundColor: (props: any) => props.type === "menuTab" || props.type === "menuRecommandation" || props.type === "menuDashboard" ? "none" : theme.palette.blue.dark,
    color: (props: any) => props.type === "menuTab" || props.type === "menuRecommandation" || props.type === "menuDashboard" ? theme.palette.blue.main : theme.palette.white,
    border: "none",
    "&:before": {
      content: "",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: "50%",
      width: "80%",
      height: 2,
      transform: "translate(-50%,-50%)",
      background: theme.palette.blue.dark
    }
  }
}));
