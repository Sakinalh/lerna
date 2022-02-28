import { FormControl, InputLabel, OutlinedInput } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import { Search } from "@mui/icons-material";
import { ChangeEvent as ReactChangeEvent } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: theme.shape.objectShadow.boxShadowAll,
    padding: "3px 0 3px 10px",
    backgroundColor: theme.palette.white,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey.middle2
  },
  formControl: {
    width: "100%",
    display: "flex",
    opacity: "50%"
  },
  input: {
    border: 0
  }
}));

export interface AppSearchProps {}

//
export function AppSearch(_props: AppSearchProps): JSX.Element {
  const classes = useStyles({});

  function handleChange(_e: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

  }

  return (

    <div className={classes.root}>
      <Search/>
      <FormControl
        classes={{
          root: classes.formControl
        }}
        variant="outlined"
      >
        <InputLabel id="filter" >Global search</InputLabel>
        <OutlinedInput
          id="search-global"
          value=""
          onChange={handleChange}
          classes={{
            root: classes.input,
            notchedOutline: classes.input
          }}
          labelWidth={60}
        />
      </FormControl>
    </div>
  );
}
