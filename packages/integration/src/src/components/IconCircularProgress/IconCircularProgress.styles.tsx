import makeStyles from "@mui/styles/makeStyles";

export const IconCircularProgressStyles = makeStyles(theme => ({

  root: (props: {pct, DEFAULT_PERIMETER}) => ({
    "& .progressCircle": {
      position: "relative",
      "&.isComplete": {
        "& .progressCircle__circle": {
          stroke: theme.palette.green.main
        },
        "& .progressCircle__check": {
          display: "block"
        }
      },
      "&__svg": {
        transform: "rotate(-90deg)",
        background: theme.palette.grey.light,
        borderRadius: "50%",
        display: "block"
      },
      "&__circle": {
        "--perimeter": props.DEFAULT_PERIMETER,
        "--pct": props.pct,
        fill: theme.palette.grey.light,
        stroke: theme.palette.grey.light,
        strokeWidth: "9px",
        strokeDasharray:
            "calc(var(--pct, 45) * var(--total, 22) / 100) var(--total, 22)"
      },
      "&__center": {
        borderRadius: "50%",
        strokeWidth: "6px",
        fill: "white",
        stroke: "white"
      },
      "&__check": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: 9,
        width: 9,
        fill: theme.palette.green.main,
        display: "none"
      }
    }
  })
}));