import * as React from "react";
import { Fragment, MouseEvent as ReactMouseEvent, useCallback, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { ExtendedTemplateZoneApi } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { PaginatedListApi, PaginatedQueueListApi, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { tryGetTemplateQueueKwdAction } from "src/PageGeneration/store/queue.epic";
import { useVirtual } from "react-virtual";
import { AppText } from "src/components/AppText/AppText.component";
import { AppLoadStateBtn } from "../../../../components/AppLoadStateBtn/AppLoadStateBtn.component";
import { QueueKwdAreasPairColWrapper } from "../QueueKwdAreasColWrapper/QueueKwdAreasColWrapper.component";
import { QueueAreaItem } from "../QueueAreaItem/QueueAreaItem.component";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    position: "relative",
    "&::before": {
      content: "''",
      borderTop: "1px solid #F2F2F2",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    "&::after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0
    }
  },
  list: {
    display: "grid",
    gridAutoFlow: "column",
    overflowX: "auto",
    overflowY: "hidden"

  },

  col_headers: {
    display: "grid",
    gridAutoFlow: "column"
  },
  cols: {
    width: 250
  },
  col_wrap: {},
  col: {},
  col_header_wrap: {
    padding: "10px 0",
    minHeight: 20,
    color: "#95969B"

  },
  col_content: {
    position: "relative"
  },
  cellHead: {
    lineHeight: 1.5
  },
  hide: {
    opacity: 0
  },
  btn_row: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10
  }
});

function getMaxLen(kwds: Array<ExtendedTemplateZoneApi[]>) {
  let maxLen = 0;
  for(const zones of kwds) {
    if(maxLen < zones.length) {
      maxLen = zones.length;
    }
  }
  return maxLen;
}

interface QueueKwdAreasColProps {
    id: number;
}

function _returnMatrix(
  id: number,
  paginatedQueue: PaginatedQueueListApi
) {
  return paginatedQueue.hasOwnProperty(id) ? paginatedQueue[id].results : [];
}

export function QueueKwdAreasCol({ id }: QueueKwdAreasColProps) {
  const classes = useStyles({});

  const matrix = useSelector(
    (state: StoreState) => state.pageQueue.formattedList
  );

  const pagination: Record<number, PaginatedListApi<ExtendedTemplateZoneApi[]>> = useSelector((state: StoreState) => state.pageQueue.formattedList);

  const dispatch = useDispatch();

  const parentRef = useRef();

  const currentMatrix = _returnMatrix(id, matrix);
  const maxAreasNum = getMaxLen(currentMatrix);

  const maxAreas = new Array(maxAreasNum).fill(null);

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: maxAreas.length,
    parentRef,
    estimateSize: useCallback(() => 250, []),
    overscan: 5
  });

  const rowVirtualizer = useVirtual({
    size: currentMatrix.length,
    parentRef,
    estimateSize: useCallback(() => 150, []),
    overscan: 8
  });

  function loadMore(
    e: ReactMouseEvent<HTMLButtonElement | MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    const pag = pagination[id.toString()];
    if(pag.next) {
      dispatch(tryGetTemplateQueueKwdAction({ query: pag.next, id }));
    }
  }

  function paginateNext(
    id: string,
    paginate: Record<number, PaginatedListApi<ExtendedTemplateZoneApi[]>>
  ) {
    if(!paginate[id]) {
      return true;
    }

    return paginate[id].next === null;
  }

  // give default value to non existing value
  const fillMatrix = currentMatrix.map(row => row.concat(new Array(maxAreasNum - row.length).fill({ page_id: undefined })));
  return (
    <section className={classes.root}>
      <div className={classes.list}>
        <div>
          <header className={classes.col_headers}>
            {maxAreas.map((_c, x_index) => (
              <QueueKwdAreasPairColWrapper key={`${id}_areas_col_${x_index}`}
                  customStyle={classes.col_header_wrap}>
                <Fragment>

                  <AppText text={`${TRANSLATE.shared.area} ${x_index + 1}`} capitalize="first"
                      props={{ classes: { root: classes.cellHead } }}
                    />
                  <AppText text={`${TRANSLATE.shared.score}`} capitalize="first"
                      props={{ classes: { root: classes.cellHead } }}
                    />
                </Fragment>
              </QueueKwdAreasPairColWrapper>
            ))
            }
          </header>
          <div className={classes.col_content}
            style={{
              height: `${rowVirtualizer.totalSize}px`,
              width: `${columnVirtualizer.totalSize}px`,
              position: "relative"
            }}
            ref={parentRef as any}
          >
            {rowVirtualizer.virtualItems.map(virtualRow => (
              columnVirtualizer.virtualItems.map(virtualColumn => (
                <div
                    key={`${id}__${virtualRow.index}_${virtualColumn.index}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`
                    }}
                  >
                  <QueueAreaItem
                      zone={fillMatrix[virtualRow.index][virtualColumn.index]}
                      rowId={id}
                      pageId={fillMatrix[virtualRow.index][virtualColumn.index].page_id}
                    />
                </div>
              ))))}

          </div>

        </div>
      </div>

      <div className={clsx(classes.btn_row, {
        [classes.hide]: paginateNext(id.toString(), pagination)
      })}>
        <AppLoadStateBtn
          dataState="idle"
          onClick={e => loadMore(e, id)}
          defaultLabel="load more"
        />
      </div>

    </section>
  );
}
