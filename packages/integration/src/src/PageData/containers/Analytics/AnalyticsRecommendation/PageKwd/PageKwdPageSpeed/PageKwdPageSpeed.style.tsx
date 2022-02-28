import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  section: {
    width: "100%",
    minHeight: 476,
    backgroundColor: theme.palette.white,
    padding: "26px 56px 71px 26px",
    boxSizing: "border-box"
  },
  container: {
    marginTop: 35,
    display: "flex",
    marginRight: 24,
    boxSizing: "border-box",
    width: "100%",
    height: "100%"
  },
  graph: {
    display: "flex",
    justifyContent: "center",
    width: "28.1431411531%", /* 263 */
    height: "100%",
    "& .container": {

      display: "flex",
      flexDirection: "column",
      height: "100%",
      paddingTop: 32,
      boxSizing: "border-box",
      alignItems: "center"

    },
    "& .link": {
      marginTop: 20,
      display: "inline-block"
    }

  },
  data: {
    marginLeft: "4.4731610338%", /* 45 */
    width: "67.3836978131%", /* 698 */
    height: "100%",
    "& .toogle": {
      display: "flex",
      justifyContent: "space-between",
      width: 62,
      "& > *": {
        paddingBottom: 4,
        cursor: "pointer"
      }
    },
    "& .container": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%"
    },
    "& .headerData": {
      "& > *": {
        display: "inline-block"
      },
      marginTop: 29,
      display: "flex",
      justifyContent: "space-between",
      "& span:first-child": {
        transform: "translate(0, -50%)",
        top: "50%",
        left: 0,
        position: "relative"
      }
    }
  },
  legends: {
    marginTop: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75%",
    "& .item": {
      position: "relative",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center"
    }
  },
  round: {
    width: 15,
    height: 15,
    display: "inline-block",
    marginRight: 5,
    borderRadius: "50%"
  },
  square: {
    width: 15,
    height: 15,
    display: "inline-block",
    marginRight: 5
  },
  triangle: {
    display: "inline-block",
    marginRight: 5,
    width: 0,
    height: 0,
    borderLeft: "calc(15px / 2) solid transparent",
    borderRight: "calc(15px / 2) solid transparent",
    borderBottom: "calc(30px / 2) solid blue"
  },
  progressBars: {
    marginTop: 20,
    position: "relative",
    zIndex: 1,
    height: 5,
    "&::before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: 5,
      background: theme.palette.red.main,
      zIndex: -1

    },
    "& > *": {
      display: "inline-block",
      top: -5
    }

  },
  progressBar: {
    position: "relative",
    "& p": {
      display: "block",
      position: "absolute",
      top: 0,
      "&:nth-child(even)": {
        left: 0,
        transform: "translate(-50%,100%)"
      },
      "&:nth-child(odd)": {
        right: 0,
        transform: "translate(0%,100%)"
      }
    }

  },
  cursor: {
    zIndex: 5,
    position: "absolute",
    height: 9,
    width: 1,
    transform: "translate(-50%, -50%)",
    background: theme.palette.black,
    top: 0,
    right: 0,
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      transform: "translate(-50%, -100%)",
      borderRadius: "50%",
      height: 7,
      width: 7,
      border: `1px solid ${theme.palette.black}`,
      background: theme.palette.white
    }

  },
  copyright: {
    display: "flex",
    justifyContent: "justify-content",
    alignItems: "center",
    boxSizing: "border-box",
    "& svg": {
      height: 35,
      width: "auto",
      marginRight: 10
    }
  }
}));