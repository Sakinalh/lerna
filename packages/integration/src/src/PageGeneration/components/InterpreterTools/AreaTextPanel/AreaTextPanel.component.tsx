import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Button } from "src/deps";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AreaTextSetter } from "../AreaTextActions/AreaTextSetter/AreaTextSetter.component";
import { AreaTextSetterAdvanced } from "../AreaTextActions/AreaTextSetterAdvanced/AreaTextSetterAdvanced.component";
import { VariableList } from "../VariablesActions/VariableList/VariableList.component";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  btn: {
    borderRadius: theme.shape.border.radiusMin,
    marginBottom: 15
  }
}));

interface AreaTextPanelProps {
    onClose: Function
}

export function AreaTextPanel({ onClose }: AreaTextPanelProps) {
  const classes = useStyles({});
  const [advMode, setFormType] = useState<boolean>(false);
  const { selectedZone } = useSelector((state: StoreState) => state.ruleDetail.interpreter);

  function toggleFormType(_e, isSimple: boolean) {
    setFormType(!isSimple);
  }

  return (
    <section className={classes.root}>
      <main>
        <AppBtn variant={advMode ? "contained" : "outlined"}
          classes={{ root: classes.btn }}
          color='secondary'
          onClick={_e => toggleFormType(_e, advMode)}>
          Advanced setting
        </AppBtn>
        {advMode
          ? <AreaTextSetterAdvanced selectedZone={selectedZone as any} onClose={onClose}/>
          : <AreaTextSetter selectedZone={selectedZone as any} onClose={onClose}/>}
      </main>
      <aside>
        <VariableList/>

      </aside>

    </section>
  );
}
