import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import { ListItemText, Menu, MenuItem, Typography } from "../../deps";
import { btnMenuStyle } from "./BtnMenu.style";
import { AppBtn } from "../AppBtn/AppBtn.component";

export interface MenuItemInterface {
    name: string;
    value: string;
}

export interface BtnMenuProps {
    onSelectItem: (value: any) => void;
    menuItems: MenuItemInterface[];
    btnLabel?: string;
}

/**
 *
 * @param menuItems
 * @param onSelectItem
 * @constructor
 * @description This component simulate a select html component
 */
export const BtnMenu: React.FC<BtnMenuProps> = ({ menuItems, onSelectItem, btnLabel }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = btnMenuStyle();

  const _onSelectItem = (value: string) => {
    onSelectItem(value);
    setOpenMenu(false);
  };

  const _onBtnClick = (e: any) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(!openMenu);
  };

  return (
    <div className={classes.root}>
      <AppBtn onClick={e => _onBtnClick(e)}>
        <div className="btnContainer">
          <Typography component={"span"}>{btnLabel && btnLabel}</Typography>
          <KeyboardArrowDownIcon width={25} height={25}/>
        </div>
      </AppBtn>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
      >
        {
          menuItems.map(item => <MenuItem key={item.name} onClick={() => _onSelectItem(item.name)}>
            <ListItemText primary={item.value} />
          </MenuItem>)
        }
      </Menu>
    </div>
  );
};
