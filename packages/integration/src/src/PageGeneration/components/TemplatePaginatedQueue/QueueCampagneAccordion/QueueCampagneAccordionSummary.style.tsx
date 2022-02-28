import makeStyles from "@mui/styles/makeStyles";

export const useAccordionSummaryStyle = makeStyles({
  expanded: {
    flexDirection: "row-reverse",
    color: "red",

    "& svg:not(.progressCircle__check)": {
      transform: "rotate(-90deg)"
    },

    "& .Mui-expanded": {
      "& svg:not(.progressCircle__check)": {
        transform: "rotate(180deg)"
      }
    }
  }
});
