import { ChangeEvent as ReactChangeEvent, MouseEvent as ReactMouseEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormControlLabel } from "src/deps";
import { useDispatch, useSelector } from "react-redux";
import { QueueListInterface, SelectableKwdPages, StoreState } from "src/model";
import { OutlinedCheckboxCheckedIcon, OutlinedCheckboxIcon } from "src/PageGeneration/shared/style";
import * as TRANSLATE from "src/shared/translation/en.json";
import { TemplateKeywordApi, TemplatePageApi } from "src/PageGeneration/model";
import { PAGE_ADWORDS_LINK, PAGE_ADWORDS_PUBLISH } from "src/api/routes/api_routes";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { TemplatePageStatePath, TemplatePageStateProps, tryPostTemplatePageAction } from "../../../store/sem.epic";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.grey.dark
  }
}));

export interface PublishPageItem {
    keyword_id: number;
    page_id: string
}

export interface LinkKwdAdgroupItem {
    keyword_id: number;
    customer_id: string;
    page_id: string;
}

interface QueueTablePublishBtnProps {

}

function getSelectedPage(selectableState: SelectableKwdPages) {
  const kPages = Object.keys(selectableState);
  return kPages.reduce((acc: { pageId: string, ruleId: number }[], curr) => {
    if(selectableState[curr].isSelected) {
      return [...acc, ...[{ pageId: selectableState[curr].selectedPage, ruleId: selectableState[curr].ruleId }]];
    }
    return acc;
  }, []);
}

// on post publish , interface is {keyword_id, page_id }
// on post link kwd  , interface is {keyword_id, customer_id,  page_url.????? }

function payloadItem(linkPage, kwd: TemplateKeywordApi, page: TemplatePageApi, customerId): PublishPageItem | LinkKwdAdgroupItem {
  return linkPage
    ? {
      page_id: page.page_id,
      keyword_id: kwd.keyword_id,
      customer_id: customerId
    }
    : { keyword_id: kwd.keyword_id, page_id: page.page_id };
}

// DO NOt refresh the list to reflect state update as usual lose internal state
// but above all, the query cost a lot for api time response && recreate node
// can have >3000 nodes
/**
 * take the payload to update to the server, append some extra date to update the store state
 * mainly full path ruleID-> kwd id->page id => prop
 * the take as base payload to be closest to the remote update.
 * in case filter out incomplete path
 * worst case, client update < server
 *
 * @param payload
 * @param selection
 * @param prop
 */
function appendDataPath(payload: FlatArray<Array<PublishPageItem | LinkKwdAdgroupItem>[], 1>[], selection: { pageId: string, ruleId: number }[], prop: TemplatePageStateProps): TemplatePageStatePath {
  return payload.map((p) => {
    const _match = selection.find(el => el.pageId === p.page_id);
    return {
      ..._match,
      kwdId: p.keyword_id,
      prop
    };
  }).filter(p => p.hasOwnProperty("pageId") && p.hasOwnProperty("ruleId")) as TemplatePageStatePath;
}

export function QueueTablePublishBtn(_props: QueueTablePublishBtnProps) {
  const classes = useStyles({});
  const [linkSelection, setLinkSelection] = useState(false);
  const dispatch = useDispatch();
  const {
    list,
    selectedKeywords
  }: QueueListInterface = useSelector((state: StoreState) => state.pageQueue);
  const customerId = window.localStorage.getItem("naister_user_customer_id");

  function publish(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, selectionState: SelectableKwdPages, linkPage: boolean) {
    const selection = getSelectedPage(selectionState);
    e.preventDefault();
    const keywords = list.results.reduce(
      (acc: TemplateKeywordApi[], curr) => [...acc, ...curr.keywords],

      []
    );
    const payload = keywords.map(kwd => kwd.pages
      .filter(p => linkSelection ? p.is_published : !p.is_published) // if want to link the selection,  get the one is_published (to be linked)
      .reduce(
        (acc: Array<PublishPageItem | LinkKwdAdgroupItem>, curr: TemplatePageApi) => {
          const isMatch = selection.find(s => s.pageId === curr.page_id);
          // if  page id matches selection key, do whatever with current value
          return isMatch ? [...acc, ...[payloadItem(linkPage, kwd, curr, customerId)]] : acc;
        },
        []
      )).flat();

    const url = linkPage ? PAGE_ADWORDS_LINK : PAGE_ADWORDS_PUBLISH;
    const prop: TemplatePageStateProps = linkPage ? "is_linked" : "is_published";

    if(payload.length === 0) {
      return;
    }

    dispatch(tryPostTemplatePageAction({
      url,
      data: payload,
      updateAction: { value: true, path: appendDataPath(payload, selection, prop) }
    }));
  }

  function handleChange(event: ReactChangeEvent<HTMLInputElement>) {
    setLinkSelection(event.target.checked);
  }

  const label = linkSelection ? "link selection" : TRANSLATE.btn.selectedPages;
  return (
    <div className={classes.root}>
      <AppBtn variant='contained'
        color="secondary"
        onClick={e => publish(e, selectedKeywords, linkSelection)}>
        {label}
      </AppBtn>
      <FormControlLabel
        control={
          <AppCheckbox
          whiteBg
            checked={linkSelection}
            onChange={handleChange}
            name="publish to google ads"
            color="primary"
            inputProps={{ "aria-label": "labelId" }}
            icon={<OutlinedCheckboxIcon size="sm"/>}
            checkedIcon={<OutlinedCheckboxCheckedIcon size="sm"/>}
            classes={{ root: classes.root }}
          />
        }
        labelPlacement="end"
        label={TRANSLATE.selectedPages}
      />
    </div>

  );
}
