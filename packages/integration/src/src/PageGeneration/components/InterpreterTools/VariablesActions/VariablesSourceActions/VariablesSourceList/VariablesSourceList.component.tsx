import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateSourceApi } from "src/PageGeneration/model";
import { DataByDate } from "src/model";
import { VariableSourceListCol } from "src/PageGeneration/components/InterpreterTools/VariablesActions/VariablesSourceActions/VariableSourceListCol/VariableSourceListCol.component";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0 15px",
    color: theme.palette.grey.middle2,
    fontSize: "1em"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "15% 20% 20% 20% 25%"
  },
  head: {},
  content: {},
  hide: {
    opacity: 0
  },
  dayHeading: {
    fontWeight: "bold"

  },
  name: {}
}));

interface VariablesSourceActionsProps {
    data: DataByDate<TemplateSourceApi>[],
}

export function VariablesSourceList({ data }: VariablesSourceActionsProps) {
  const classes = useStyles({});
  return (
    <ul className={classes.root}>
      {
        data.map((groupByDate, idx) => (
          <li className={classes.row}
              key={`${groupByDate.viewValue}__${idx}`}>
            <VariableSourceListCol<TemplateSourceApi>
                colName={groupByDate.viewValue}
                data={groupByDate.data}
                renderProps={{
                  type: "sourceCheckbox",
                  path: []
                }}
                overrideStyle={{ head: classes.dayHeading }}/>
            <VariableSourceListCol<TemplateSourceApi>
                colName="name"
                data={groupByDate.data}
                renderProps={{
                  type: "text",
                  path: ["name"],
                  overrideStyle: classes.name
                }}
                overrideStyle={idx > 0 ? classes.hide : {}}/>
            <VariableSourceListCol<TemplateSourceApi>
                colName="author"
                data={groupByDate.data}
                renderProps={{
                  type: "user",
                  path: [""]
                }}
                overrideStyle={idx > 0 ? classes.hide : {}}/>

            <VariableSourceListCol<TemplateSourceApi>
                colName="created"
                data={groupByDate.data}
                renderProps={{
                  type: "date",
                  path: ["creation_date"]
                }}
                overrideStyle={idx > 0 ? classes.hide : {}}/>

            <VariableSourceListCol<TemplateSourceApi>
                colName=""
                data={groupByDate.data}
                renderProps={{
                  type: "sourceAction",
                  path: [""]
                }}/>

          </li>

        ))
      }
    </ul>

  );
}
