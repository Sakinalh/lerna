import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "../../../components/AppText/AppText.component";
//
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    "&::before": {
      content: "''",
      height: 3,
      backgroundColor: theme.palette.blue.light,
      position: "absolute",
      top: 5,
      left: 0,
      right: 0
    }
  },
  pointSerie: {
    position: "relative",
    paddingTop: 2,
    zIndex: 99,
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  point: {
    height: 10,
    width: 10,
    backgroundColor: theme.palette.blue.dark,
    borderRadius: "50%"
  }
}));

interface MessageMatchTimeSeriesProps {
    timeSeries: string[];
}

export function MessageMatchTimeSeries({ timeSeries }: MessageMatchTimeSeriesProps) {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      {
        timeSeries.map(t => (
          <div className={classes.pointSerie} key={`${t}__ts`}>
            <div className={classes.point}/>
            <AppText text={t} props={{ variant: "caption" }}/>
          </div>
        ))
      }

    </div>
  );
}
