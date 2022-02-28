import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { AreaProductItemInterface } from "src/model";
import { IconButton } from "src/deps";
import { ChevronRight } from "@mui/icons-material";
import { INIT_AREA_PRODUCT_ITEM } from "src/PageGeneration/store/app.ruleDetail.reducer";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = (props: { maxHeight: number }) => makeStyles({
  product: {
    padding: "0 8px"
  },
  item: {
    height: "100%",
    maxHeight: props.maxHeight
  },
  header: {
    width: "100%",
    padding: "3px 0",
    display: "grid",
    justifyContent: "center",
    gridTemplateColumn: "70% 30%"

  },
  action: {
    padding: 0
  },
  description: {
    fontSize: ".9em"

  }

});

interface AreaProductItemProps {
    datum: AreaProductItemInterface;
    maxHeight: number;
    onNavNext: Function;
}

export function AreaProductItem(props: AreaProductItemProps) {
  const { datum = INIT_AREA_PRODUCT_ITEM, maxHeight, onNavNext } = props;
  const classes = useStyles({ maxHeight })(props);

  return (
    <article className={classes.product}>
      <img src={datum.image_url}
        className={classes.item}
        alt={datum.description}/>
      <header className={classes.header}>

        <AppText text={datum.title}/>
        <IconButton
          classes={{ root: classes.action }}
          onClick={ev => onNavNext(ev)}
          size="large">
          <ChevronRight/>
        </IconButton>
      </header>
      <AppText text={datum.description} props={{ variant: "caption", classes: { root: classes.description } }}/>

    </article>
  );
}
