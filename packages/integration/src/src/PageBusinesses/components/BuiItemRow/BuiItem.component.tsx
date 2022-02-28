import googleLogo from "src/assets/img/Google__G__Logo.svg";
import { MenuItem } from "@mui/material";
import { useStyles } from "./BuiItem.style";

export default function BuiItem(props) {
  const {index, defaultIndex, item, handleShowDetails} = props;
  const classes = useStyles({});
  return <MenuItem sx={{height: 110, backgroundColor: index === defaultIndex ? "#EFF5FF": null}} key={index} divider onClick={() => handleShowDetails(index)}>
    <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
      <div className={classes.block}>
        {/* <img
            className={classes.logo}
            src={googleLogo}
            alt="application has error"
        /> */}
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
          <span className={classes.column}>{item.business_name}</span>
          <span className={classes.caption}>{item.Pk}</span>
        </div>
      </div>
      <div className={classes.block}>
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
          <span className={classes.caption}>{"Date de création"}</span>
          <span className={classes.column}>{item.creation_date}</span>
        </div>
      </div>
      <div className={classes.block}>
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
          <span className={classes.caption}>{"Dernière activité"}</span>
          <span className={classes.column}>{item.lastActivity}</span>
        </div>
      </div>
      {defaultIndex === -1 && <div className={classes.block}>
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
          <span className={classes.caption}>{"URL site web"}</span>
          <span className={classes.column}>{item.website}</span>
        </div>
      </div>}
      {defaultIndex === -1 && <div className={classes.block}>
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
          <span className={classes.caption}>{"Members"}</span>
          <span className={classes.column}>{25}</span>
        </div>
      </div>}
    </div>
  </MenuItem>;
}
