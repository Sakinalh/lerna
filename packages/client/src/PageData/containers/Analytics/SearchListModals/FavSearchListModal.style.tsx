import makeStyles from "@mui/styles/makeStyles";

export const useDialoagContentStyle = makeStyles(() => ({
  root: {
    padding: "40px 40px 0px 40px"
  }
}));

export const useListStyles = makeStyles(theme => ({
  root: {
    width: "585px",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px"
  }
}));

export const useDialogStyle = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    "& button": {
      textTransform: "none"

    }
  },
  paper: {
    textTransform: "none",
    maxWidth: "700px"
  }
}));

export const useListItemStyles = makeStyles(theme => ({
  rootContainer: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    padding: "18px 40px  18px 29px",
    height: "95px",
    borderRadius: "3px",
    backgroundColor: theme.palette.grey.light,
    "& hr": {
      mx: 0.5
    }
  }
}));

export const useDialogActionsStyles = makeStyles(theme => ({
  root: {
    margin: "0px",
    padding: "0px 31px  0px 43px",
    height: "79px",
    backgroundColor: theme.palette.grey.light,
    display: "flex"
  }
}));
