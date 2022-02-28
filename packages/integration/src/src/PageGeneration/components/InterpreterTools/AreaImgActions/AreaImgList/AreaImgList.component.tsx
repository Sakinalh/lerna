import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateImageBankImageItemApi } from "src/PageGeneration/model";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";

const useStyles = makeStyles(theme => ({
  root: {
    height: 120

  },
  list: {
    display: "flex",
    "overflow-x": "auto"
  },
  item: {
    height: "100%",
    padding: "0 8px",
    maxHeight: 120
  },
  img: {
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%"
  },

  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    color: theme.palette.grey.middle2,
    fontSize: theme.shape.constShape.defaultFontSize
  },
  hide: {
    display: "none"
  }
}));

interface AreaImgListProps {
}

export function AreaImgList(props: AreaImgListProps) {
  const classes = useStyles(props);

  const imgs: TemplateImageBankImageItemApi[] = useSelector(
    (state: StoreState) => state.ruleDetail.areaImg.content.img_list.results
  );

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {imgs.map((i, idx: number) => (
          <li key={`${i.id}_${idx}`} className={classes.item}>
            <img src={i.url}
                className={classes.item}
                alt={i.url}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
