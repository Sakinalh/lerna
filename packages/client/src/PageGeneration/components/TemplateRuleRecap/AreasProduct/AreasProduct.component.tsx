import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { SubProduct, TemplateAreaItemProduct } from "src/PageGeneration/model";
import { PhotoLibraryOutlined } from "@mui/icons-material/";
import { AppText } from "src/components/AppText/AppText.component";
import { RenderPrimitive } from "../RenderPrimitive/RenderPrimitive.component";

const useStyles = makeStyles(theme => ({

  block: {
    margin: "10px 0",
    display: "grid",
    gridColumnGap: 70,
    gridTemplateColumns: "40% 33%"
  },
  preview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    border: `dashed 1px ${theme.palette.grey.light}`,
    padding: "10px 0",
    margin: "10px 0",
    width: 253
  },
  productInfo: {
    paddingTop: 10,
    textAlign: "center"
  },
  img: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  iconImg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    background: theme.palette.grey.light,
    borderRadius: 10,
    height: 100
  },
  icon: {
    color: "#A9A9A9",
    fontSize: "3em"
  },
  prodDesc: {
    opacity: "40%"
  },
  titleFilters: {
    padding: "3px 0"
  },

  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  aside: {
    paddingTop: 10
  }
}));

function productValue(subProd: SubProduct[], commentValue: string): string {
  const _sub = subProd.find(subzone => subzone.comment === commentValue);
  return _sub ? (_sub.rule as any).value : "";
}

interface AreasProductProps {
    datum: TemplateAreaItemProduct;
}

export function AreasProduct({ datum }: AreasProductProps): JSX.Element {
  const classes = useStyles({});

  const titleValue = productValue(datum.sub_zones, "product title");
  const descriptionValue = productValue(datum.sub_zones, "product description");

  return (

    <article className={classes.block}>
      <aside className={classes.aside}>
        <AppText text="Preview"
          themeColor="neutralColor"/>
        <div className={classes.preview}>
          <div className={classes.iconImg}>
            <PhotoLibraryOutlined classes={{ root: classes.icon }}/>
          </div>
          <div className={classes.productInfo}>
            <AppText text={titleValue}/>
            <AppText text={descriptionValue}
              props={{ classes: { root: classes.prodDesc } }}/>

          </div>
        </div>
      </aside>
      <main className={classes.main}>
        <RenderPrimitive
          data={datum.rule.sources}
          nameSpace="source"
          title="Product bank"
        />
        <AppText text="Product Attributes"
          themeColor="neutralColor"
          props={{ classes: { root: classes.titleFilters } }}
        />
        {datum.rule.filters.map((f: any, idx) =>

          <AppText
            text={`${f.filter_name} : ${f.type === "text" ? f.value : f.min_value + "-" + f.max_value}`}
            capitalize="first"
            themeColor="initial"
            key={`filter__${idx}`}
            props={{ classes: { root: classes.titleFilters } }}

          />)}
      </main>
    </article>

  );
}
