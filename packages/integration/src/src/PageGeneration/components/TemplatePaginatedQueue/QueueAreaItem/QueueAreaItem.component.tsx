import makeStyles from "@mui/styles/makeStyles";
import { ExtendedTemplateZoneApi } from "src/PageGeneration/model";
import { Fragment, useMemo } from "react";
import { useTheme } from "@mui/material";
import { TemplateZoneText } from "../TemplateZoneText/TemplateZoneText.component";
import { TemplateZoneImg } from "../TemplateZoneImg/TemplateZoneImg.component";
import { QueueKwdAreasPairColWrapper } from "../QueueKwdAreasColWrapper/QueueKwdAreasColWrapper.component";

const useStyles = makeStyles(theme => ({
  empty: {
    height: theme.shape.constShape.queueCellHeight,
    "&::before": {
      content: "''",
      borderTop: "1px solid #F2F2F2",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0
    }
  },
  btn: {
    color: theme.palette.blue.main
  },
  img: {
    height: "auto",
    maxWidth: "100%",
    maxHeight: "70%"
  },

  score: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
    color: "black"
  },
  cell_wrap: {
    paddingRight: 5,
    height: theme.shape.constShape.queueCellHeight
  }
}));

interface QueueAreaItemProps {
    zone: ExtendedTemplateZoneApi;
    pageId: string;
    rowId: number;
}

function renderTemplateCell(zone, rowId, pageId) {
  const MAP_TYPE_VIEW = {
    image: <TemplateZoneImg zone={zone} rowId={rowId} pageId={pageId}/>,
    text: <TemplateZoneText zone={zone} rowId={rowId} pageId={pageId}/>
  };

  return zone.data_type === null ? <div/> : MAP_TYPE_VIEW[zone.data_type];
}

export function QueueAreaItem({ zone, rowId, pageId }: QueueAreaItemProps) {
  const theme = useTheme();
  const classes = useStyles({});
  const memoizedCell = useMemo(() => renderTemplateCell(zone, rowId, pageId), [zone, rowId, pageId]);

  if(!zone || pageId === undefined) {
    return <div className={classes.empty}/>;
  }
  return (
    <QueueKwdAreasPairColWrapper customStyle={classes.cell_wrap}>
      <Fragment>
        {memoizedCell}
        <div className={classes.score}
          style={zone.score === 0 ? { color: theme.palette.red.main } : undefined}>{zone.score}%
        </div>
      </Fragment>
    </QueueKwdAreasPairColWrapper>
  );
}
