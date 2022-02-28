import { Dialog, DialogActions, DialogTitle, Button, DialogContentText, DialogContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { confirmDialogStyle } from "./ConfirmDialog.style";

export interface ConfirmDialogProps {
    handleClose: () => void;
    handleConfirm: () => void;
    open: boolean;
    title: string;
    textContent: string;
    confirmLabel?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({handleClose, open, title, textContent, handleConfirm, confirmLabel}) => {
  const theme = useTheme();
  const classes = confirmDialogStyle(theme);

  return (
    <Dialog onClose={handleClose} open={open} className={classes.paper}>
      <DialogTitle>
        <CloseIcon className={classes.icon} onClick={handleClose} />
        <Typography variant='h2'>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant='subtitle2'>{textContent}</Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{backgroundColor: theme.palette.grey.light}} className={classes.root}>
        <Button color='secondary' onClick={handleClose}>Cancel</Button>
        <Button color='error' variant='contained' onClick={handleConfirm}>{confirmLabel || "Confirm"}</Button>
      </DialogActions>
    </Dialog>
  );
};