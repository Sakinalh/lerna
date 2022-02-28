import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { IconButton, Menu, MenuItem } from "src/deps";

import { useDispatch } from "react-redux";
import { MoreVertOutlined } from "@mui/icons-material";
import { tryDeleteRuleDetailFromTemplateListAction } from "../../store/rule.epic";

const useStyles = makeStyles({
  root: {
    // width: "100%"
  }
});

interface TemplateActionBtnProps {
    selectedRuleId: number | null;
    templateId: number;
    onDelete: Function;
}

export function TemplateActionBtn({ selectedRuleId, templateId, onDelete }: TemplateActionBtnProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDelete() {
    if(selectedRuleId) {
      dispatch(tryDeleteRuleDetailFromTemplateListAction({ ruleId: selectedRuleId as number, templateId }));
      onDelete(null);
      handleClose();
    }
  }

  return (
    <div className={classes.root}>

      <IconButton
        aria-label="option"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="large">
        <MoreVertOutlined/>
      </IconButton>
      <Menu
        id="template-action-menus"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled={!Number.isFinite(selectedRuleId as any)}
          button
          onClick={handleDelete}>
          Delete
        </MenuItem>
        {/*     <MenuItem onClick={handleClose}>Pause</MenuItem>
                <MenuItem onClick={handleClose}>Archive</MenuItem> */}
      </Menu>
    </div>
  );
}
