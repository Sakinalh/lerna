import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { PageAdgroupInterface, PageKwdInterfaceView } from "src/PageGeneration/model";
import produce from "immer";
import { AppText } from "src/components/AppText/AppText.component";
import { useDispatch, useSelector } from "react-redux";
import { DetailAdgroupSearch } from "./DetailAdgroupSearch/DetailAdgroupSearch.component";
import { DetailAdgroupList } from "./DetailAdgroupList/DetailAdgroupList.component";
import { PaginatedListApi, StoreState } from "../../model";
import {
  tryBatchKeywordListAction,
  tryGetKeywordListAction,
  updateKeywordListAction
} from "../../PageGeneration/store/sem.epic";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingBottom: 10
  },
  block: {
    marginTop: 10,
    outline: theme.shape.border.solidGrey
  }
}));

export interface DetailAdgroupProps {
    // persist the selection outside local state
    onSelect?: (selection: PageAdgroupInterface[]) => void;
    onSelectAll?: (selection: PageAdgroupInterface[]) => void;
    nextState?: "reset" | "idle";

}

export function DetailAdgroup({
  onSelect = payload => payload,
  onSelectAll = payload => payload,
  nextState = "idle"
}: DetailAdgroupProps) {
  const classes = useStyles({});

  const [next, setNext] = useState<PageAdgroupInterface[]>([]);
  const dispatch = useDispatch();
  const keywordsPaginate: PaginatedListApi<PageKwdInterfaceView> = useSelector((state: StoreState) => state.ruleDetail.keywords.list);
  const customerId = window.localStorage.getItem("naister_user_customer_id");

  useEffect(() => {
    if(nextState === "reset") {
      setNext(_s => []);
      dispatch(updateKeywordListAction({
        next: null,
        previous: null,
        count: 0,
        results: []
      }));
    }
  }, [nextState, dispatch]);

  function _setKwdsList(sel: PageAdgroupInterface[]) {
    if(sel.length > 0) {
      dispatch(tryBatchKeywordListAction({
        customerId: customerId as string,
        adGrpIdList: sel.map(ag => ag.adgroup_id)
      }));
    } else {
      dispatch(updateKeywordListAction({
        count: 0,
        next: null,
        previous: null,
        results: []
      }));
    }
  }

  /**
     * updating adgroups selection, update related available keywords
     * if it's a new adgroups, ->api call and append it to current kwds list
     *  else filter keywords of  adgroup id
     * @param action
     * @param keywordList
     * @param selAdgroupId
     * @param customerId
     */
  function _updateKeywordsList(action: "ADD" | "REMOVE", keywordList: PaginatedListApi<PageKwdInterfaceView>, selAdgroupId: string, customerId: string) {
    if(action === "ADD") {
      dispatch(tryGetKeywordListAction([customerId as string, selAdgroupId]));

      return;
    }
    const _keywords = keywordList.results.filter(el => el.adgroup_id !== selAdgroupId);
    dispatch(updateKeywordListAction({
      ...keywordsPaginate,
      count: _keywords.length,
      results: _keywords
    }));
  }

  /**
     *  update adgroups selection
     *
     * @param action
     * @param adgroupList
     * @param sel
     */
  function _updateAdgroupSelection(action: "ADD" | "REMOVE", adgroupList: PageAdgroupInterface[], sel: PageAdgroupInterface) {
    // update adgroup selection
    const _selection = action === "ADD"
      ? produce(adgroupList, (draftState: PageAdgroupInterface[]) => {
        draftState.push(sel);
      })
      : adgroupList.filter(el => el.adgroup_id !== sel.adgroup_id);

    setNext(_selection);

    onSelect(_selection);
  }

  function handleSelect(payload: { action: "ADD" | "REMOVE", value: PageAdgroupInterface }) {
    const {
      action, value
    } = payload;

    _updateAdgroupSelection(action, next, value);
    _updateKeywordsList(action, keywordsPaginate, value.adgroup_id, customerId as string);
  }

  function handleSet(payload: PageAdgroupInterface[]) {
    setNext(payload);
    _setKwdsList(payload);
    onSelectAll(payload);
  }

  return (
    <section className={classes.root}>
      <AppText text={`Adgroups (${next.length})`}/>
      <div className={classes.block}>
        <DetailAdgroupSearch
          selection={next}
          onSelect={handleSelect}/>
        <DetailAdgroupList
          selection={next}
          onSetAll={handleSet}
          onSelect={handleSelect}/>
      </div>

    </section>
  );
}
