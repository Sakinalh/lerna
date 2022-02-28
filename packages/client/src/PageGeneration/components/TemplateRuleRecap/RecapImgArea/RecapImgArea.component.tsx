import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateAreaItemImg } from "src/PageGeneration/model";
import { CropOriginal } from "@mui/icons-material";
import { AppText } from "src/components/AppText/AppText.component";
import { RenderPrimitive } from "../RenderPrimitive/RenderPrimitive.component";
import { AreaSettingValue } from "../../../../model";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  list: {
    display: "flex",
    padding: "5px 0"
  },
  label: {
    paddingBottom: 5
  },
  text: {
    "&::after": {
      paddingRight: 5,
      content: "''",
      fontSize: "inherit"
    }
  },
  block: {
    display: "grid",
    gridColumnGap: 10,
    gridTemplateColumns: "50% 40%",
    margin: "10px 0"
  },
  main: {},
  aside: {},
  dashed: {
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `dashed 1px ${theme.palette.grey.light}`,
    height: "90%",
    width: 253
  },
  iconImg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    background: theme.palette.grey.light,
    borderRadius: 10,
    height: 130,
    margin: 15
  },
  icon: {
    color: "#A9A9A9",
    fontSize: "3em"
  },
  col: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 50
  }
}));

function _getDimension(tuples: AreaSettingValue[], type: "height" | "width") {
  const _d = tuples.find(d => d.filter === type);
  return _d ? _d.max_value : 0;
}

interface RecapImgAreaProps {
    datum: TemplateAreaItemImg;
}

export function RecapImgArea({ datum }: RecapImgAreaProps): JSX.Element {
  const classes = useStyles({});

  const height = _getDimension(datum.rule.design, "height");
  const width = _getDimension(datum.rule.design, "width");

  return (

    <div className={classes.root}>
      <div className={classes.block}>
        <aside className={classes.aside}>
          <AppText text="Preview"
            themeColor="neutralColor"
            props={{ classes: { root: classes.label } }
            }/>
          <div className={classes.dashed}>
            <div className={classes.iconImg}>
              <CropOriginal classes={{ root: classes.icon }}/>
            </div>
          </div>
        </aside>

        <main className={classes.main}>
          <ul className={classes.col}>
            <li className={classes.row}>
              <RenderPrimitive
                data={datum.rule.sources}
                nameSpace="source"
                title="image bank"
              />
            </li>
            <li className={classes.row}>
              <article>

                <AppText themeColor="neutralColor"
                  text="image design" props={{ classes: { root: classes.label } }
                  }/>

                <AppText text={`Height: ${height}px`}/>
                <AppText text={`Width: ${width}px`}/>

              </article>
            </li>
          </ul>

        </main>

      </div>
    </div>
  );
}
