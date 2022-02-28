import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  FormControl,
  FormGroup,
  TextField,
  FormControlLabel
} from "src/deps";
import { Button, CircularProgress, Grid, IconButton, Skeleton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import {
  setSelectedCampainAction,
  setSelectedRuleAction
} from "src/PageGeneration/store/actions";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { queryParamsToStr } from "src/components/AppPaginator/AppPaginator.component";
import { RuleInterface } from "../../../../model/store";
import { setPageQueuePaginationAction, tryGetTemplateQueueKwdAction } from "../../../store/queue.epic";
import { useAccordionStyles } from "./QueueCampagneAccordion.style";
import { CampaignInterface } from "../../../../model/api";
import {
  IconCircularProgress,
  IconCircularProgressProps
} from "../../../../components/IconCircularProgress/IconCircularProgress.component";

interface CustomAccordionDetailsProps {
  campaign: CampaignInterface;
  rule: any; // RuleInterface;
}

export const CustomAccordionDetails: React.FC<CustomAccordionDetailsProps> = ({
  campaign,
  rule
}) => {
  const dispatch = useDispatch();
  const classes = useAccordionStyles();

  const { updateUrl, deleteQueryParam } = useUrlSearchParams();

  const viewResult = () => {
    deleteQueryParam(["offset", "limit"]);
    updateUrl("k_limit", "10");
    updateUrl("k_offset", "0");
    updateUrl("campaignId", campaign.id, "/generation/campaign/");

    // dispatch(
    //   setPageQueuePaginationAction({
    //     qState: {rule: rule.id, campaign: campaign.id,  limit: 10, offset: 0},
    //     qStr: queryParamsToStr({'rule': rule.id, 'offset': 0, 'limit': 10, campaign: campaign.id })
    //   })
    // );

    dispatch(setSelectedCampainAction(campaign));
  };

  return (
    <TableRow data-cy="detailsTableRow">
      <TableCell data-cy="detailsTableCell" className="table__cell ">
        <Grid
          container
          justifyContent="space-between"
          className="gridTab grid--details gridTab--space gridTab--main gridTab--border"
        >
          <Grid container item className="gridTab" width="auto">
            <Grid className="gridTab__cell gridTab__cell--large" item>
              <span className="queueTab__input">
                {campaign.name || "Campagne 1"}
              </span>
            </Grid>
            <Grid className="gridTab__cell gridTab__cell--fix" item>
              <IconCircularProgress
                value={campaign.processed_pages}
                total={campaign.total_pages}
              />
            </Grid>
          </Grid>

          <Grid
            alignItems="center"
            justifyContent="center"
            className="gridTab__cell gridTab__cell--fix gridTab__cell--right"
            item
          >
            <Button variant="contained"
              className={classes.button}
              onClick={() => viewResult()}
              data-cy={`viewResultCp-${rule.id}`}>
              View results
            </Button>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>);
};
