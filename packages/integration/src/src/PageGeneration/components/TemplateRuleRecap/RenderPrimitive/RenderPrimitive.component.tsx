import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  list: {
    display: "flex",
    padding: "10px 0 5px"
  },
  text: {
    "&::after": {
      paddingRight: 5,
      content: "\",\"",
      fontSize: "inherit"
    }
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 50

  },
  cell: {
    width: "50%",
    paddingBottom: 10
  }
});

interface RenderPrimitiveProps {
    data: Array<string | number>;
    nameSpace: string;
    title: string;
}

export function RenderPrimitive({ data, nameSpace, title }: RenderPrimitiveProps) {
  const classes = useStyles({});
  return (
    <div className={classes.cell}>

      <AppText text={title} themeColor="neutralColor"/>
      <ul className={classes.list}>
        {
          data.map((t, idx) => (
            <li key={`${nameSpace}__${idx}`}>

              <AppText text={t as string}
                  themeColor="initial"
                  props={
                    { classes: { root: classes.text } }
                  }
                />

            </li>

          ))
        }
      </ul>

    </div>
  );
}
