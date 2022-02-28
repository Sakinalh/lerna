import { Grid, LinearProgress, Button, Typography, useTheme } from "@mui/material";
import clsx from "clsx";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { TemplateZoneApi } from "src/PageGeneration/model";
import { useNavigate } from "react-router-dom";
import { getItemFromLocalStorage, setItemToLocalStorage } from "src/shared/form";
import { numberFormat } from "src/shared/utils";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { BlockArea_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { useStyles } from "./BlockArea.style";

export interface BlockAreaProps {
  action: (areaId: string) => void;
  area: TemplateZoneApi;
  id: number
}

export function BlockArea(props: BlockAreaProps) {
  const {
    action = () => {
      // eslint-disable-next-line
      console.log("action");
    },
    area,
    id
  } = props;

  const { getQueryParams } = useUrlSearchParams();
  const [_zoneId] = getQueryParams(BlockArea_QParamsType);

  const StyleProgress = (progress) => {
    const style = "blockArea__progress";

    if(progress >= 0 && progress < 30) {
      return `${style}--less`;
    }

    if(progress >= 30 && progress < 70) {
      return `${style}--neutral`;
    }

    if(progress >= 70) {
      return `${style}--more`;
    }
  };

  const HeaderBtn = (type) => {
    switch (type) {
      case "image":
        return (
          <Button
          sx={{padding: 0, minWidth: "auto", textDecoration: "underline"}}
          variant="text"
          onClick={() => action(area.id)}
          >
            <Typography sx={{fontWeight: 700}} variant="caption">
              Edit
            </Typography>
          </Button >
        );
      case "text":
        return (
          <Button
            sx={{padding: 0, minWidth: "auto", textDecoration: "underline"}}
            variant="text"
            onClick={() => action(area.id)}
          >
            <Typography sx={{fontWeight: 700}} variant="caption">
              Change
            </Typography>
          </Button>
        );
      case "product":
        return (
          <Button
            sx={{padding: 0, minWidth: "auto", textDecoration: "underline"}}
            variant="text"
            onClick={() => action(area.id)}
          >
            <Typography sx={{fontWeight: 700}} variant="caption">
              View
            </Typography>
          </Button>
        );
    }
  };

  const classes = useStyles({});
  const theme = useTheme();

  const onSelectZone = () => {
    setItemToLocalStorage("selectedZone", area);
    action(area);
  };

  return (
    <div className={clsx("blockArea", classes.root, { "isActive": _zoneId === area.id })} onClick={onSelectZone}>
      <div className="blockArea__header">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid data-cy="BlockAreaType" item>
            <span className="blockArea__header--bold">Area: {id + 1}</span> type: {area.type}
          </Grid>
          <Grid item >{HeaderBtn(area.type)}</Grid>
        </Grid>
      </div>
      <div className="blockArea__body">
        {area.type === "image" ? <img alt={area.id} className="blockArea__img" src={area.content} /> : <p>{area.type === "text" ? area.content : `${area.content} Products`}</p>}
      </div>
      <div className="blockArea__footer">
        <div className="blockArea__footer--container">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item><Typography color={theme.palette.grey.dark} sx={{fontWeight: "normal"}} variant="caption">Score</Typography> </Grid>
            <Grid item><Typography color={theme.palette.black} sx={{fontWeight: 700}} variant="caption">{numberFormat(area.score, 2, "%")}</Typography> </Grid>
          </Grid>
          <LinearProgress
          className={clsx("blockArea__progress", StyleProgress(area.score))}
          classes={{
            root: "progress"
          }}
          variant="determinate"
          value={Number(area.score)}
        />
        </div>
      </div>
    </div>
  );
}
