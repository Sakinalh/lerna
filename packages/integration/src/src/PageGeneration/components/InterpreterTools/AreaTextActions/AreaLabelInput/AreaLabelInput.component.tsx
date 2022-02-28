import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles({
  labelWrap: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  selected: {
    fontSize: ".8em"
  }
});

interface AreaLabelInputProps {
    label: string;
    selectLen: number;

}

export function AreaLabelInput({ label, selectLen }: AreaLabelInputProps) {
  const classes = useStyles({});

  return (
    <div className={classes.labelWrap}>
      <AppText text={label} themeColor="neutralColor"/>
      <AppText text={`${selectLen} selected`} themeColor="actionColor"
        props={{ classes: { root: classes.selected } }}/>
    </div>
  );
}
