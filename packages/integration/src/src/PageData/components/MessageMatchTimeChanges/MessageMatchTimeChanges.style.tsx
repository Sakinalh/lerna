import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.messageMatchchanges": {

      "& .accordion": {

        "&.Mui-expanded": {

          "& .accordion__triangle": {
            transform: "rotate(-180deg)"
          }

        },
        padding: 0,
        boxShadow: "none",
        "&::before": {
          backgroundColor: "inherit"
        },
        "&__triangle": {
          marginLeft: 10,
          top: "2.5px",
          position: "relative",
          // height: 12,
          // display:"block",

          ...props.mixins.triangle("10px", "down", theme.palette.blue.main)

        }
      },

      "& .list": {
        maxWidth: 697,
        margin: "0 auto",
        "&__nameRow": {
          padding: "10px 0 10px 64px"
        },
        "&__point": {
          height: 5,
          width: 5,
          backgroundColor: theme.palette.black,
          borderRadius: "50%",
          display: "inline-block"
        },
        "&__name": {
          fontSize: "1.2em",
          display: "inline-block",
          paddingLeft: 15,
          fontWeight: 700
        },
        "&__value": {
          maxWidth: 697,
          textAlign: "left",
          marginBottom: 30
        }
      }

    }
  }
}));
