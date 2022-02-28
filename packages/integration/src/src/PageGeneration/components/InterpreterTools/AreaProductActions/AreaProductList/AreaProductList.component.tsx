import * as React from "react";
import { useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { AreaProductItemInterface } from "src/model";
import { AreaProductItem } from "../AreaProductItem/AreaProductItem.component";

const useStyles = makeStyles({
  root: {
    height: 200,
    display: "flex"
  },
  list: {
    display: "flex",
    overflowX: "auto",
    "overflow-y": "clip"

  },
  item: {
    width: 130,
    padding: "0 4px"

  }

});

interface AreaProductListProps {
    data: AreaProductItemInterface[];
}

export function AreaProductList(props: AreaProductListProps) {
  const { data } = props;
  const classes = useStyles(props);
  const listRef = useRef<null | HTMLUListElement>(null);

  function handleNavNext(idx: number, maxLen: number) {
    return (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      (listRef.current !).scrollLeft = idx >= maxLen ? 0 : (idx * 80);
    };
  }

  return (
    <div className={classes.root}>

      <ul className={classes.list}
        ref={listRef}
      >
        {
          data.map((d, idx: number) => <li key={`cat_prod_${idx}`}
            className={classes.item}>
            <AreaProductItem datum={d}
              maxHeight={80}
              onNavNext={handleNavNext(idx + 1, data.length)}/>
          </li>)
        }

      </ul>
    </div>

  );
}
