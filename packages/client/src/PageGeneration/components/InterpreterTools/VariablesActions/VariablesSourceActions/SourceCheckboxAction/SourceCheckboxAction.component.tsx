import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateSourceApi } from "src/PageGeneration/model";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { patchSelectedSource } from "src/PageGeneration/store/variableSources.epic";
import { AccessAlarm } from "@mui/icons-material";
import {
  OutlinedCheckboxCheckedIcon,
  OutlinedCheckboxIcon
} from "src/PageGeneration/shared/style";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  text: {},
  icon: {
    color: theme.palette.green.dark,
    fontSize: theme.shape.constShape.defaultFontSize
  }
}));

interface SourceCheckboxActionProps {
  datum: TemplateSourceApi;
  path: string[];
  type?: string;
  overrideStyle?: Object;
}

export function SourceCheckboxAction(props: SourceCheckboxActionProps) {
  const {
    datum: { id }
  } = props;
  const classes = useStyles({});
  const dispatch = useDispatch();
  const selected: Record<string, boolean> = useSelector(
    (state: StoreState) => state.ruleDetail.variableData.sources.selected
  );

  function handleClick(e: React.ChangeEvent<HTMLInputElement>, id) {
    dispatch(patchSelectedSource({ key: id, value: e.target.checked }));
  }

  return (
    <div className={classes.root}>
      <AppCheckbox
        whiteBg
        isSmall
        onClick={(event: any) => handleClick(event, id)}
        checked={selected[id] ?? true }
        inputProps={{ "aria-labelledby": "labelId" }}
      />

      <AccessAlarm classes={{ root: classes.icon }} />
    </div>
  );
}
