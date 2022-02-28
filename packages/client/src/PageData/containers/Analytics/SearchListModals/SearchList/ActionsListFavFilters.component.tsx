import React from "react";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

interface ActionsListFavFiltersProps {
    onClose: () => void;
    onSeeMore: () => void;
    totalSearch: number;
}

const useStyles = makeStyles(theme => (
  {
    footer: {
      display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"
    },
    label: {
      display: "flex", justifyContent: "center", alignItems: "center"
    },
    btns: {
      "& > *:first-child": {
        marginRight: "20px"
      }
    }
  }
));

export const ActionsListFavFilters: React.FC<ActionsListFavFiltersProps> = ({onClose, onSeeMore, totalSearch = 0}) => {
  const classes = useStyles({ });
  const _onCancel = () => { onClose(); };
  const _onSeeMore = () => { onSeeMore(); };

  return (
    <div className={classes.footer}>
      <Typography className={classes.label} variant='subtitle2'>
        Showing {totalSearch} saved searchs
      </Typography>
      <div className={classes.btns}>
        <Button color="secondary" autoFocus onClick={() => _onCancel()}>
          Cancel
        </Button>
        <Button color="primary" variant='contained' autoFocus onClick={() => _onSeeMore()}>
          See more
        </Button>
      </div>
    </div>
  );
};