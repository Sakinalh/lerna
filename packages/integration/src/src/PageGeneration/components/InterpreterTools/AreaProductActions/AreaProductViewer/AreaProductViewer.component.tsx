import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { AreaProductItemInterface } from "src/model";
import { AreaProductList } from "../AreaProductList/AreaProductList.component";

const useStyles = makeStyles({
  root: {}
});

interface AreaProductViewerProps {
    data: AreaProductItemInterface[];
}

export function AreaProductViewer(props: AreaProductViewerProps) {
  const classes = useStyles(props);
  const { data } = props;
  return (
    <div className={classes.root}>
      <AreaProductList data={data}/>

    </div>
  );
}
