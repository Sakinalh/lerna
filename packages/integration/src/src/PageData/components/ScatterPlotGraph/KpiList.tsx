import React, { useState, useRef } from "react";
import { List, Typography, useTheme, ListItemButton, ListItemText, Popover } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useStyles } from "./KpiList.style";

interface KpiListInterface {
    kpisList: any[];
    selectedKpi: string;
    onSelectKpi: Function;
}

export const KpiList: React.FC<KpiListInterface> = ({kpisList, selectedKpi, onSelectKpi}) => {
  const [openKpiList, setOpenKpiList] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  const _onSelectKpi = (kpiName: string, name: string) => {
    setOpenKpiList(false);
    onSelectKpi(kpiName, name);
  };
  const refKpi = useRef(null);

  return (
    <div className={classes.kpiList}>
      <ListItemButton ref={refKpi} onClick={() => setOpenKpiList(!openKpiList)}>
        <Typography variant="subtitle1" component="span" color="primary" sx={{textDecoration: "underline"}}>{selectedKpi}</Typography>
        {openKpiList ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </ListItemButton>
      <Popover
                open={openKpiList}
                anchorEl={refKpi?.current}
                onClose={() => setOpenKpiList(false)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
            >
        <List style={{width: 250}} component="div" disablePadding>
          { kpisList?.map((kpi, index) => (
            <ListItemButton key={index} onClick={() => _onSelectKpi(kpi.display_name, kpi.name) } className={classes.listItemButton}>
              <ListItemText primary={kpi.display_name} />
            </ListItemButton>))
                    }

        </List>
      </Popover>
    </div>
  );
};