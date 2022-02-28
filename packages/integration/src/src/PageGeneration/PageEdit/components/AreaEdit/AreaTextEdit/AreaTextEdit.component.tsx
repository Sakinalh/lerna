import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Radio, TextField } from "@mui/material";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppTag } from "src/components/AppTag/AppTag.component";
import clsx from "clsx";
import {
  setTxtContentByZoneAction,
  tryGetTxtContentAction,
  tryGetTxtProposalsAction
} from "src/PageGeneration/store/actions";
import { PROCESS_STATUS, StoreState } from "src/model";
import { updateDataTextAreaAction } from "src/PageGeneration/store/action";
import { AppSkeleton } from "src/components";
import { ZONE_TYPES } from "src/PageGeneration/PageEdit/components/AreaEdit/AreaEdit.component";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { areaTextEdit_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { numberFormat } from "src/shared/utils";
import { SuggestionItem } from "./SuggestionItem.component";

interface AreaTextEditProps {
  currentZoneIndex: number;
}

export function AreaTextEdit(props: AreaTextEditProps) {
  const { currentZoneIndex } = props;

  const dispatch = useDispatch();
  const queryParams = ["pageId", "keywordId", "ruleId", "zoneId", "zoneScore"];

  const {getQueryParams} = useUrlSearchParams();

  const [_pageId, _keywordId, _ruleId, _zoneId, _zoneScore] = getQueryParams(areaTextEdit_QParamsType);

  const params = {
    page_id: _pageId,
    zone_id: _zoneId
  };

  const paramsProposal = {
    rule_id: _ruleId,
    page_id: _pageId,
    zone_id: _zoneId,
    keyword_id: _keywordId,
    limit: 3,
    offset: 0
  };

  const payload = {
    rule_id: _ruleId,
    page_id: _pageId,
    zone_id: _zoneId,
    keyword_id: _keywordId
  };

  const app_process_status = useSelector((state: StoreState) => state.app.processStatus);
  const currentZone = useSelector(
    (state: StoreState) => state.pageQueue.currentTextZone
  );
  const currentTextProposals = useSelector(
    (state: StoreState) => state.ruleDetail.areaTxt.results
  );

  const [processStatus, setProcessStatus] = useState(app_process_status);
  const [currentChoose, setcurrentChoose] = useState(currentZone.text_value);
  const [newTxt, setNewTxt] = useState(currentZone.text_value);
  const [isEdited, setisEdited] = useState(false);

  useEffect(() => {
    setProcessStatus(app_process_status);
  }, [app_process_status]);

  useEffect(() => {
    dispatch(tryGetTxtContentAction(params));
  }, []);

  useEffect(() => {
    dispatch(tryGetTxtProposalsAction(paramsProposal));
    setNewTxt(currentZone.text_value);
  }, [currentZone]);

  const handleSetTxt = (valueTxt) => {
    const isProposal = currentTextProposals.filter(proposal => proposal.zone_value === valueTxt && proposal);

    dispatch(
      updateDataTextAreaAction({
        page_id: payload.page_id,
        keyword_id: `${payload.keyword_id}`,
        update: {
          content_id: isProposal.length <= 0 ? "" : isProposal[0].content_id,
          type: ZONE_TYPES.text,
          value: valueTxt,
          score: 0,
          zone_id: payload.zone_id
        }
      })
    );
  };

  const handleNewTxt = (e) => {
    setNewTxt(e.target.value);
  };

  const handleEditFieldSave = () => {
    handleSetTxt(currentChoose);
    dispatch(setTxtContentByZoneAction({ text_value: currentChoose }));
  };

  const toggleisEdited = () => {
    setNewTxt(currentZone.text_value);
    setcurrentChoose(currentZone.text_value);
    setisEdited(!isEdited);
  };

  const editCurrentSelection = () => {
    setNewTxt(newTxt);
    setcurrentChoose(newTxt);
    setisEdited(!isEdited);
  };

  const handleSuggestionsChoose = (choose) => {
    // eslint-disable-next-line
    console.log(choose, "choose");
    setcurrentChoose(choose);
  };

  const useEditFieldValue = () => {
    setcurrentChoose(newTxt);
  };

  useEffect(() => {
    setNewTxt(currentZone.text_value);
    setcurrentChoose(currentZone.text_value);
  }, [currentZone]);

  return (
    <>
      <h2 className="pageDetails__title pageDetails__title--mbTxt">
        Area {currentZoneIndex}
      </h2>
      <h3 style={{marginBottom: 5}} className="pageDetails__subTitle">{currentZone.name}</h3>
      <Grid
        container
        className={clsx("tabLine tabLine--edited", {
          "tabLine--active": isEdited
        })}
        alignItems="center"
        justifyContent="space-between"
        onClick={() => {
          !isEdited && useEditFieldValue();
        }}
      >
        <Grid item alignItems="center" justifyContent="flex-start">
          <Radio
            checked={newTxt === currentChoose}
            name="textSelect"
            className="tabLine__radio radio radio--little"
          ></Radio>

          <TextField
            fullWidth
            placeholder="Search by rule name"
            id="outlined-basic"
            InputProps={{
              classes: {
                root: "input input__outline--root",
                focused: "input input__outline--focused",
                disabled: "input input__outline--disabled"
              }
            }}
            className="tabLine__input"
            variant="outlined"
            value={newTxt}
            data-cy="textFieldEdit"
            onChange={handleNewTxt}
          />

          <div className="tabLine__container">
            <span title={newTxt} className="tabLine__title ellipsis">
              {newTxt && PROCESS_STATUS.DONE === processStatus ? (
                newTxt
              ) : (
                <AppSkeleton type="FULL" />
              )}
            </span>

            <AppTag customclass="tabLine__tag" stateColor="more">
              {numberFormat(_zoneScore, 2, "%")}
            </AppTag>
          </div>
        </Grid>

        <div className="tabLine__btnEdit">
          <AppBtn
            color={"inherit"}
            typeBtn="customSecondary"
            customclass="tabLine__btn tabLine__btn--visible isWhite"
            onClick={toggleisEdited}
          >
            Edit
          </AppBtn>
          <AppBtn
            data-cy="btnCancelEditText"
            onClick={toggleisEdited}
            typeBtn="customSimple"
            noPadding
            customclass="tabLine__btn tabLine__btn--edit "
          >
            Cancel
          </AppBtn>

          <AppBtn
          color={"inherit"}
            customclass="tabLine__btn tabLine__btn--edit isWhite"
            typeBtn="customSecondary"
            noPadding
            onClick={editCurrentSelection}
            disabled={newTxt?.length <= 0 || newTxt.length <= 0 || currentChoose && currentZone.text_value === newTxt }
          >
            Edit
          </AppBtn>

        </div>
      </Grid>
      {currentTextProposals.length > 0 && (
        <h3 style={{marginBottom: 5}} className="pageDetails__subTitle">
          Some more suggestions for the text
        </h3>
      )}
      {currentTextProposals.length > 0 &&
        (currentTextProposals || Array.from(new Array(3))
        ).map((data, index) => data && PROCESS_STATUS.DONE === processStatus ? (
          <SuggestionItem
              key={index}
              currentChoose={currentChoose}
              handleSuggestionsChoose={handleSuggestionsChoose}
              value={data.zone_value}
              pct={data.score}
              index={index}
            />
        ) : (
          <AppSkeleton key={index} type="TXT_SUGGESTIONS_LI" />
        ))}

      <Grid
        className="pageDetails__endBtn"
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item>
          <AppBtn
            data-cy="zoneTxtSave"
            typeBtn="primary"
            noPadding
            onClick={handleEditFieldSave}
            disabled={newTxt.length <= 0 || currentChoose && currentZone.text_value === newTxt || isEdited }
          >
            Save
          </AppBtn>
        </Grid>
      </Grid>
    </>
  );
}
