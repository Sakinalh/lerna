import { Tab, Tabs } from "src/deps";
import { FormattedLIstItem } from "src/model";
import makeStyles from "@mui/styles/makeStyles";
import { SyntheticEvent as ReactSyntheticEvent } from "react";
import {useStyles} from "./TabsActions.styles";

export interface TabsActionsProps {
    defaultValue: string;
    values: FormattedLIstItem[];
    onValueChange?: Function;
    value: string;
    customProps?: Object;
    overrideStyle?: Object;
    tabClick?: Function;
    type?: string
}

export function TabsActions(
  {
    defaultValue, values = [],
    onValueChange = v => v,
    value,
    type = "",
    customProps = {},
    overrideStyle = {},
    tabClick = (value: string) => value
  }: TabsActionsProps
) {
  const _classes = useStyles({type});
  const classes = { ..._classes, ...overrideStyle };
  return (
    <Tabs
            defaultValue={defaultValue}
            TabIndicatorProps={{ className: classes.indicator }}
            value={value}
            textColor="inherit"
            aria-label="tabs"
            onChange={(e: ReactSyntheticEvent, value) => onValueChange(e, value)}
            classes={{ root: classes.root }}
            {...customProps}
        >
      {values.map(v => (
        <Tab data-cy={`tabQueue_${v.viewValue}`} key={v.value}
                    label={v.viewValue}
                    value={v.value}
                    icon={v.icon}
                    classes={{ root: classes.tab, selected: classes.selected }}
                    onClick={(e) => {
                      e.preventDefault();
                      tabClick(v.value);
                    }}
                />
      ))}
    </Tabs>
  );
}
