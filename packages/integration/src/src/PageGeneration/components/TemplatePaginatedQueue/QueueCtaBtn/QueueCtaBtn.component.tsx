import { MouseEvent as ReactMouseEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as TRANSLATE from "src/shared/translation/en.json";
import { useDispatch, useSelector } from "react-redux";
import { tryDeletePageFromQueueAction, tryPostTemplatePageAction } from "src/PageGeneration/store/sem.epic";
import { PAGE_ADWORDS_LINK, PAGE_ADWORDS_PUBLISH } from "src/api/routes/api_routes";
import { QueuePageState, StoreState } from "src/model";
import { TemplateKeywordApi, TemplatePageApi } from "src/PageGeneration/model";
import { setModalActionStateAction } from "src/PageGeneration/store/shared.epic";
import clsx from "clsx";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { GenerationCancelBtn } from "../../shared/GenerationCancelBtn/GenerationCancelBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.blue.main,
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  btn: {
    minWidth: "initial"// override theme value
  },
  label: {
    textDecoration: "underline"
  },
  hide: {
    display: "none"
  }
}));

interface QueueCtaBtnProps {
    keyword_id: number;
    keyword: TemplateKeywordApi;
    ruleId: number;
    page: TemplatePageApi
}

function setBtnLabel(pageState: QueuePageState, pageId: string, isPublished: boolean) {
  if(pageState.hasOwnProperty(pageId) && pageState[pageId].state === "error") {
    return pageState[pageId].msg;
  }

  return isPublished ? "link to adwords" : TRANSLATE.btn.publish;
}

export function QueueCtaBtn({
  keyword_id,
  ruleId,
  page: { page_id, is_published, is_linked }
}: QueueCtaBtnProps) {
  const classes = useStyles({});
  const customerId = window.localStorage.getItem("naister_user_customer_id");

  const pageState: QueuePageState = useSelector<QueuePageState>(
    (state: StoreState) => state.pageQueue.asyncPageState
  );
  const dispatch = useDispatch();

  function handlePublish(
    e: ReactMouseEvent<HTMLButtonElement>,
    ruleId: number,
    keywordId: number,
    pageId: string,
    isLinked: boolean,
    isPublished: boolean
  ) {
    e.preventDefault();

    if(isLinked) {
      // the page is linked. nothing to do I guess
      return;
    }

    // isPublished->  link the published  page else publish it first.
    const url = isPublished ? PAGE_ADWORDS_LINK : PAGE_ADWORDS_PUBLISH;

    const data = isPublished
      ? [{
        rule_id: ruleId,
        keyword_id: keywordId,
        customer_id: customerId,
        page_id: pageId
      }]
      : [{ keyword_id: keywordId, page_id: pageId }];
    // if already published update, update redux state of link else set is_published to true
    const prop = isPublished ? "is_linked" : "is_published";

    dispatch(tryPostTemplatePageAction({
      url,
      data,
      updateAction: { value: true, path: [{ ruleId, kwdId: keyword_id, pageId, prop }] }
    }));
  }

  function dismiss(
    e: ReactMouseEvent<HTMLButtonElement>,
    kdwId: number,
    pageId: string
  ) {
    e.preventDefault();

    dispatch(setModalActionStateAction({
      state: "start",
      action: tryDeletePageFromQueueAction({ ruleId, kdwId, pageId }),
      msg: "Do  you want to  permanently remove this item ?"
    }));
  }

  // don't need to check is dismissed. should be filtered ouot at this point
  const unavailable = is_linked || is_published;

  return (
    <div className={classes.root}>
      <GenerationCancelBtn
        label={TRANSLATE.btn.dismiss}
        customStyle={{ root: clsx(classes.btn, { [classes.hide]: unavailable }) }}
        onClick={e => dismiss(e, keyword_id, page_id)}/>
      <AppBtn
        key={page_id}
        classes={{ root: classes.btn, label: classes.label }}
        onClick={e => handlePublish(e, ruleId, keyword_id, page_id, is_linked, is_published)}
        color="inherit"
      >
        {setBtnLabel(pageState, page_id, is_published)}
      </AppBtn>
    </div>

  );
}
