import makeStyles from "@mui/styles/makeStyles";
import { TemplateAreaItemImg } from "src/PageGeneration/model";
import { AreaContentSource } from "../AreaContentSource/AreaContentSource.component";
import { AreaImgList } from "../AreaImgList/AreaImgList.component";

const useStyles = makeStyles({
  root: {}
});

interface AreaImgContentProps {
    selectedZone: TemplateAreaItemImg,
    onClose: Function;
}

/*
* the logic is in AreaContentSource. any selection inside AreaContentSource is rendered by AreaImgList
* */
export function AreaImgContent({ selectedZone, onClose }: AreaImgContentProps) {
  const classes = useStyles({});

  return (
    <section className={classes.root}>
      <AreaImgList/>
      <AreaContentSource onClose={onClose} selectedZone={selectedZone}/>
    </section>
  );
}
