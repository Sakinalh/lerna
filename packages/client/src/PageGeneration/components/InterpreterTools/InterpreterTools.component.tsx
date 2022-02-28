import * as React from "react";
import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { List, ListItem, ListItemIcon, ListItemText, Modal } from "src/deps";
import { AllOut, Code, Search, WebAsset } from "@mui/icons-material";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { MetaActions } from "./MetaActions/MetaActions.component";
import { VariableActions } from "./VariablesActions/VariablesActions.component";
import { UtmActions } from "./UtmActions/UtmActions.component";
import { FallbackActions } from "./FallbackActions/FallbackActions.component";
import { AreaImgActions } from "./AreaImgActions/AreaImgActions.component";
import { AreaProductActions } from "./AreaProductActions/AreaProductActions.component";
import { AreaTextActions } from "./AreaTextActions/AreaTextActions.component";
import { clearRuleDetailSharedState } from "../../store/rule.epic";

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    position: "absolute",
    top: 150,
    left: 30,
    backgroundColor: theme.palette.white,
    boxShadow: theme.shape.objectShadow.boxShadowAll,
    color: theme.palette.grey.middle2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  selected: {
    color: theme.palette.blue.main
  },
  icon: {
    color: "inherit"
  }
}));

interface InterpreterToolsProps {
    onAction: Function;
    modalSelection: [] | [string, string];
}

//

export function InterpreterTools(
  props: InterpreterToolsProps
): JSX.Element | null {
  const classes = useStyles({});
  const { onAction, modalSelection } = props;
  const [selectedOpt, setSelectedOpt] = useState("");
  const dispatch = useDispatch();

  function handleOnClose(_e) {
    setSelectedOpt("");
    onAction([]);

    dispatch(clearRuleDetailSharedState());
  }

  function handleOpen(_el, actionValue) {
    setSelectedOpt(actionValue);
    onAction([actionValue, 0]);
  }

  const actions = [
    {
      icon: <Code/>,
      viewValue: "Variables",
      value: "variables"
    },
    {
      icon: <AllOut/>,
      viewValue: "Areas",
      value: "areas"
    },
    {
      icon: <Search/>,
      viewValue: "UTM",
      value: "utm"
    },
    {
      icon: <WebAsset/>,
      viewValue: "Metas",
      value: "metas"
    }
  ];

  function mapActions(value: [] | [string, string]) {
    if(value.length === 0) {
      return null;
    }

    const [keyValue, type] = value;

    const MAP = {
      variables: <VariableActions onClose={handleOnClose} index="0"/>,
      areas: {
        product: <AreaProductActions onClose={handleOnClose} index="0"/>,
        text: <AreaTextActions
          onClose={handleOnClose}
          index="0"
        />,
        image: <AreaImgActions onClose={handleOnClose} index="0"/>
      },
      utm: <UtmActions onClose={handleOnClose} index="0"/>,
      metas: <MetaActions onClose={handleOnClose} index="0"/>,
      fallback: <FallbackActions onClose={handleOnClose} index="0"/>
    };
    try {
      if(keyValue === "areas") {
        return MAP[keyValue][type];
      }
      return MAP[keyValue];
    } catch (error) {
      return MAP.variables;
    }
  }

  const valueActions = mapActions(modalSelection);

  return (
    <div className={classes.root}>
      <List aria-label="actions on interpreter">
        {actions.map(act => (
          <ListItem
            key={act.value}
            button
            onClick={_e => handleOpen(_e, act.value)}
            classes={{
              root: clsx({
                [classes.selected]: selectedOpt === act.value
              })
            }}
          >
            <ListItemIcon classes={{ root: classes.icon }}>
              {act.icon}
            </ListItemIcon>
            <ListItemText
              primary={act.viewValue}

            />
          </ListItem>
        ))}
      </List>
      <Modal
        open={Boolean(modalSelection.length)}
        onClose={handleOnClose}
        aria-labelledby="interpreter-actions"
        aria-describedby="interpreter-actions-on-template"
        className={classes.modal}
      >
        <div>{valueActions}</div>
      </Modal>
    </div>
  );
}
