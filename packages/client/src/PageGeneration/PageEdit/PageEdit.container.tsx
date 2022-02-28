import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { useQuery } from "react-query";
import { getKeywordPages } from "src/api/react-query/keywords.store";
import { HeaderEdit } from "./components/HeaderEdit/HeaderEdit.component";
import { AreaEdit } from "./components/AreaEdit/AreaEdit.component";
import { SelectedPage } from "./components/SelectedPage/SelectedPage.component";
import { setSelectedPageAction} from "../store/actions";
import { getItemFromLocalStorage } from "../../shared/form/helper";
import { pageEdit_QParamsType } from "../shared/page_query_params";
import { useStyles } from "./PageEdit.style";

interface PageEditProps {}

export default function PageEdit(_props: PageEditProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const {
    getQueryParams
  } = useUrlSearchParams();
  const [_pageId, _keywordId, _ruleId, _zoneId] = getQueryParams(
    pageEdit_QParamsType
  );

  const storedPage = useSelector((state: StoreState) => state.pageQueue.selectedPage);

  const { data: storedPages} = useQuery(
    ["getKeywordPages", { keyword_id: _keywordId, rule_id: _ruleId }],
    getKeywordPages,
    { enabled: !!_keywordId}
  );

  const currentTextZone = useSelector(
    (state: StoreState) => state.pageQueue.currentTextZone.text_value
  );

  useEffect(() => {
    if(storedPages) {
      const newZones = [];

      const pageToStore = storedPages.filter(
        page => page.page_id === _pageId
      )[0];

      pageToStore &&
        pageToStore.zones.forEach((zone) => {
          if(zone.type !== "product" && zone.id === _zoneId) {
            newZones.push({ ...zone, content: currentTextZone });
          } else {
            newZones.push(zone);
          }
        });
      dispatch(setSelectedPageAction({ ...pageToStore, zones: newZones }));
    }
  }, [storedPages, currentTextZone]);

  const onSelectPage = (page: any) => {
    dispatch(setSelectedPageAction(page));
  };

  return (
    <div className={clsx(classes.root, "PageEdit")}>
      <HeaderEdit showPageInfo={false} />
      <div>
        <Grid container>
          {storedPage && (
            <SelectedPage page={storedPage} onSelectPage={onSelectPage} />
          )}
          <AreaEdit page={storedPage} type={_zoneId} />
        </Grid>
      </div>
    </div>
  );
}
