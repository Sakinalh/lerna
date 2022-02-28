import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.analyticsInputGroup, & .analyticsInputGroup": {
      "& .MuiInputBase-root": {
        height: 30
      },
      "&.numeric": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: 16,
        paddingRight: 16,
        "&+&": {
          marginTop: 20
        },
        "& > *": {

          "&.MuiInput-root,&.MuiFormControl-root,&.MuiInputBase-root": {
            width: 100
          }
        }
      },
      "&.text": {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        "&+&": {
          marginTop: 20
        },
        "& > *": {
          marginRight: 40,
          "&:last-child": {
            marginRight: 0
          },
          "&.MuiInput-root,&.MuiFormControl-root,&.MuiInputBase-root": {
            width: 145
          }
        }
      },
      "&.checkbox": {
        paddingLeft: 20,
        paddingRight: 20,
        "&+&": {
          marginTop: 10
        }
      },

      "& > *": {
        marginRight: "5px",
        "&:last-child": {
          marginRight: "0px"
        }
      }
    }
  },
  errorBtn: {
    height: 26,
    width: 26,
    background: "red",
    color: "white",
    transform: "scale(1.025)",
    transition: "transform .25s",
    "&:hover": {
      background: "red",
      color: "white",
      transform: "scale(1)"
    }
  }
}));
