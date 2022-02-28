import React, { useEffect, useRef, useState } from "react";
import { Divider, useTheme, Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Chip } from "@material-ui/core";
import { useStyles } from "./PageRecommendation.style";

export interface PageRecommandationProps {
 }

export default function PageRecommandation() {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const urlPage = (queryString.parse(location.search)).page_url;
  const mode = (queryString.parse(location.search)).mode;
  const [checked, setChecked] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if(checked) {
      // do the process of iframe change style
    }
  }, [checked]);

  return <section className={classes.section}>
    <div className={classes.aside}>
      <div style={{ display: "flex", flexDirection: "row"}}>
        <Typography sx={{ width: "100%" }} variant="h6" gutterBottom component="div">Current</Typography>
        <Chip label="60%" color="success" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 37, width: "100%", height: "100%", alignItems: mode === "mobile" ? "center" : "normal" }}>
        <iframe title="leftRecommendationIframe" width={mode === "mobile" ? "375px" : "100%"} height={mode === "mobile" ? "812px" : "100%"} src={urlPage} allowFullScreen></iframe>
      </div>
    </div>
    <Divider orientation="vertical" flexItem />
    <div className={classes.aside}>
      <div style={{ display: "flex", flexDirection: "row"}}>
        <div style={{ width: "100%" }}><Typography sx={{ width: "100%" }} variant="h6" gutterBottom component="div">Recommended</Typography>
          <FormControlLabel control={<Switch checked={checked} onChange={() => setChecked(!checked)} />} label="Scores by dynamic zones" />
        </div>
        <Chip label="11%" color="error" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: mode === "mobile" ? "center" : "normal" }}>
        <iframe
                     title="rightRecommendationIframe"
                     ref={iframeRef}
                     sandbox="allow-same-origin allow-scripts"
                     width={mode === "mobile" ? "375px" : "100%"}
                     height={mode === "mobile" ? "812px" : "100%"}
                     src={urlPage} allowFullScreen></iframe>
      </div>
    </div>
  </section>;
}
