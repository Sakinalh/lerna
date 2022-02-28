import { useDispatch, useSelector } from "react-redux";
import {
  ListLoadState,
  PaginatedListApi,
  PROCESS_STATUS,
  RuleDetailAppState,
  RuleInterface,
  StoreState
} from "src/model";
import clsx from "clsx";
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
import {
  ArrowDropUp,
  SignalCellularConnectedNoInternet0BarOutlined,
  Translate
} from "@mui/icons-material/";
import {
  QueuedItemStatus,
  TemplatePageRuleListApi
} from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import {
  setPageQueuePaginationAction,
  tryGetTemplateQueueKwdAction
} from "src/PageGeneration/store/queue.epic";
import { AppText } from "src/components/AppText/AppText.component";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { useEffect, useState } from "react";
import {
  setSelectedRuleAction
} from "src/PageGeneration/store/actions";
import { AppSkeleton } from "src/components";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import {templateQeue_QParamsTypes} from "src/PageGeneration/shared/page_query_params";
import { getRuleCampaigns, getRules } from "src/api/react-query/rules.store";
import { useQuery } from "react-query";
import { ProgressCell } from "./ProgressCell/ProgressCell.component";
import { QueueKwdNameCol } from "./QueueKwdNameCol/QueueKwdNameCol.component";
import { QueueKwdAreasCol } from "./QueueKwdAreasCol/QueueKwdAreasCol.component";
import { QueueKwdActionsCol } from "./QueueKwdActionsCol/QueueKwdActionsCol.component";
import { QueueKwdScoreCol } from "./QueueKwdScoreCol/QueueKwdScoreCol.component";
import { QueuePageSelectCol } from "./QueuePageSelectCol/QueuePageSelectCol.component";
import {
  DEFAULT_PAGINATION,
  PAGE_GEN_RULES
} from "../../../api/routes/api_routes";
import { QueueKwdPageCol } from "./QueueKwdPageCol/QueueKwdPageCol.component";
import { AppPaginator, queryParamsToStr } from "../../../components/AppPaginator/AppPaginator.component";

import { ReactComponent as Sorting } from "../../../styles/global/icons/sorting.svg";
import { ReactComponent as Group } from "../../../styles/global/icons/group.svg";
import { usePageQueueStyles } from "./TemplatePaginatedQueue.style";
import { CustomAccordionDetails } from "./QueueCampagneAccordion/QueueCampagneAccordion";
import { CustomAccordionSummary } from "./QueueCampagneAccordion/QueueCampagneAccordionSummary";
import { CampaignInterface } from "../../../model/api";
import { tryGetRuleCampaignsAction } from "../../store/actions";

function setLabel(status: QueuedItemStatus) {
  return status === "error" ? "check errors" : "see results";
}

interface TemplatePaginatedQueueProps {
  limit: string;
}

export function TemplatePaginatedQueue({ limit }: TemplatePaginatedQueueProps) {
  const classes = usePageQueueStyles({});
  const dispatch = useDispatch();
  const {getQueryParams, updateUrl} = useUrlSearchParams();

  const [_ruleId] = getQueryParams(templateQeue_QParamsTypes);

  const ruleDetails = useSelector((state: StoreState) => state.ruleDetail);
  const storedRule = useSelector((state: StoreState) => state.pageQueue.selectedRule);

  const [rulesCampains, setRulesCampains] = useState([]);
  const [selectedRule, setSelectedRule] = useState<number>(_ruleId);
  const { isLoading: isLoadingRules, error: fetchingRulesError, data: {
    results,
    ...rest
  } = {}} = useQuery(["getRules"], getRules);

  const {data: campaigns} = useQuery(["getRuleCampaigns", {rule_id: _ruleId }], getRuleCampaigns, {enabled: !!_ruleId});

  const app_process_status = useSelector((state: StoreState) => state.app.processStatus);

  const [processStatus, setProcessStatus] = useState(app_process_status);

  useEffect(() => {
    setProcessStatus(app_process_status);
  }, [app_process_status]);

  const dataState: ListLoadState = useSelector(
    (state: StoreState) => state.pageQueue.dataState
  );

  useEffect(() => {
    const newRulesCampains = rulesCampains;

    if(selectedRule) {
      newRulesCampains[selectedRule] = campaigns;
    }
    setRulesCampains(newRulesCampains);
  }, [selectedRule, campaigns]);

  const onSelectRule = (rule: RuleInterface, expanded: boolean, index: number) => {
    if(expanded) {
      setSelectedRule(rule.id);

      updateUrl("ruleId", rule.id);
      updateUrl("offset", "0");
      updateUrl("limit", 10);
      dispatch(setSelectedRuleAction(rule));
    }
  };

  function handleLoadKwds(id: number, kwdLen: number) {
    // naive assumption that if no kwd try fetch
    if(kwdLen === 0) {
      const q = `${PAGE_GEN_RULES}${id.toString()}/pages/?${DEFAULT_PAGINATION}`;
      dispatch(tryGetTemplateQueueKwdAction({ query: q, id }));
    }
  }

  const sortRulesList = () => {
    // eslint-disable-next-line
    console.log("sort");
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if accordion is expended
    // if(indexAccordion.includes(currentIndexAccordion)){
    setIsLoading(!isLoading);
    // }
  }, [campaigns]);

  return (
    <div
      className={clsx(classes.root, {
        // [classes.loading]: dataState !== "complete",
      })}
    >
      <div className={clsx(classes.root, "queueTab")}>
        <TableContainer component={Paper}>
          <div>
            <Table className="table">
              {/* <TableHead className="table__head">
                <TableRow className="table__row">
                  <TableCell className="table__cell table__cell--search">
                    <FormControl classes={{root : "table__fieldset"}} component="fieldset">
                      <Grid
                        spacing={3}
                        container
                        className="gridTab"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid
                          className="gridTab__cell"
                          item
                          justifyContent="center"
                          alignItems="center"
                        >
                          {dataState === "complete" ? (
                            <TextField
                              placeholder="Search by rule name"
                              className="queueTab__input queueTab__input--search"
                              id="outlined-basic"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  adornedStart: "input__outline--icon",
                                  root: "input input__outline--root",
                                  focused: "input input__outline--focused",
                                  disabled: "input input__outline--disabled",
                                },
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton
                                      disableRipple={true}
                                      disableFocusRipple={true}
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : (
                            <AppSkeleton type={"PAGINATED_QUEUE_SEARCH"} />
                          )}
                        </Grid>
                        <Grid
                          className="gridTab__cell"
                          item
                          justifyContent="center"
                          alignItems="center"
                        >
                          {dataState === "complete" ? (
                            <FormGroup>
                              <FormControlLabel
                                className="queueTab__input queueTab__input--checkbox"
                                value="end"
                                control={
                                  <AppCheckbox
                                    whiteBg
                                    color="primary"
                                    disableRipple={true}
                                  />
                                }
                                label="Show only completed"
                                labelPlacement="end"
                              />
                            </FormGroup>
                          ) : (
                            <AppSkeleton type={"PAGINATED_QUEUE_TITLE_CAT"} />
                          )}
                        </Grid>
                      </Grid>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow className="table__row">
                  <TableCell className="table__cell table__cell--th">
                    <Grid container className="gridTab">
                      <Grid
                        className="gridTab__cell gridTab__cell--large gridTab__cell--arrow"
                        item
                        justifyContent="center"
                        alignItems="center"
                      >
                        <span className="queueTab__input  queueTab__input--th queueTab__input--sorting">
                          {dataState !== "complete" ? (
                            <AppSkeleton type={"PAGINATED_QUEUE_TITLE_CAT"} />
                          ) : (
                            <>
                              Generation rule
                              <Sorting onClick={sortRulesList} />{" "}
                            </>
                          )}
                        </span>
                      </Grid>
                      <Grid
                        className="gridTab__cell gridTab__cell--fix"
                        item
                        justifyContent="center"
                        alignItems="center"
                      >
                        <span className="queueTab__input  queueTab__input--th">
                          {dataState !== "complete" ? (
                            <AppSkeleton type={"PAGINATED_QUEUE_TITLE_CAT"} />
                          ) : (
                            "Total Pages Generated"
                          )}
                        </span>
                      </Grid>
                      <Grid
                        className="gridTab__cell gridTab__cell--fix gridTab__cell--right"
                        item
                        justifyContent="center"
                        alignItems="center"
                      >
                        <span className="queueTab__input  queueTab__input--th queueTab__input--sorting ">
                          {dataState !== "complete" ? (
                            <AppSkeleton type={"PAGINATED_QUEUE_TITLE_CAT"} />
                          ) : (
                            <>
                              {" "}
                              Date create <Sorting
                                onClick={sortRulesList}
                              />{" "}
                            </>
                          )}
                        </span>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody className="table__body">
                {(isLoadingRules || fetchingRulesError
                  ? Array.from(new Array(3))
                  : results
                ).map((rule: RuleInterface, index: number) => (
                  <TableRow
                      data-cy="queueRow"
                      className="table__row"
                      key={index}
                    >
                    <TableCell data-cy={`queueCell-${rule?.id}`} className="table__cell ">
                      <Accordion
                          expanded={selectedRule === rule?.id }
                          onChange={(event, expanded) => {
                            onSelectRule(rule, expanded, index);
                          }}
                          className="accordion"
                        >
                        {rule ? (
                          <CustomAccordionSummary rule={rule} />
                        ) : (
                          <AppSkeleton type={"PAGINATED_QUEUE_RULE"} />
                        )}
                        <AccordionDetails
                            data-cy={"queueDetails"}
                            className="accordion__details accordion__details--queue"
                          >
                          <Table className="table table--accordion">
                            <TableHead className="table__head">
                              <TableRow className="table__row">
                                <TableCell className="table__cell">
                                  <Grid container className="gridTab gridTab--main">
                                    <Grid
                                        className="gridTab__cell gridTab__cell--large  table__cell--th"
                                        item
                                      >
                                      <span className="queueTab__input  queueTab__input--th">
                                        Campaign name
                                      </span>
                                    </Grid>
                                    <Grid
                                        className="gridTab__cell gridTab__cell--fix table__cell--th"
                                        item
                                      >
                                      <span className="queueTab__input  queueTab__input--th">
                                        Pages Generated
                                      </span>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody className="table__body">
                              {campaigns ? (
                                rule &&
                                  rulesCampains[rule.id] &&
                                  rulesCampains[
                                    rule.id
                                  ].map((campaign: CampaignInterface) =>
                                    rule.id === selectedRule.id &&
                                      processStatus ===
                                      PROCESS_STATUS.PROCESSING ? (
                                        <AppSkeleton type="PAGINATED_QUEUE_RULE" />
                                      ) : (
                                        <CustomAccordionDetails
                                        key={campaign.id}
                                        campaign={campaign}
                                        rule={rule}
                                      />
                                      ))
                              ) : (
                                <AppSkeleton type="PAGINATED_QUEUE_RULE" />
                              )}
                            </TableBody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </div>
      <AppPaginator
        pagination={rest}
        count={rest.count}
        dispatcherCb={setPageQueuePaginationAction}
        chunkSize={limit}
      />
    </div>
  );
}
