import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { tryGetOptimizationAction } from "src/PageData/store/optimizationEpic$";
import { useDispatch, useSelector } from "react-redux";
import { OptimizationPagesApi, OptPageItemApi, OptTemplateApi, StoreState } from "src/model/store";
import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import produce, { Draft } from "immer";
import { OptOrphanPages } from "src/PageData/components/OptOrphanPages/OptOrphanPages.component";
import { OptTemplateList } from "src/PageData/components/OptTemplateList/OptTemplateList.component";
import { OptLinkTemplateBtn } from "../../components/OptLinkTemplateBtn/OptLinkTemplateBtn.component";

/**
 * swap item in same list
 * @param list
 * @param origPosition
 * @param destPosition
 */
function swapItemOrder<T>(list: Array<T>, origPosition: number, destPosition: number) {
  const source = list[origPosition];
  const destEl = list[destPosition];
  return produce(list, (draftState) => {
    (draftState as Draft<Array<any>>)[origPosition] = destEl;
    (draftState as Draft<Array<any>>)[destPosition] = source;
  });
}

function moveBetweenTemplatePath(list: OptTemplateApi[], srcId: string, destId: string): [number, number] | [] {
  const templateDest = list.findIndex(el => el.template_id === destId);
  const templateOrigin = list.findIndex(el => el.template_id === srcId);

  if(templateDest >= 0 && templateOrigin >= 0) {
    return [templateOrigin, templateDest];
  }
  return [];
}

function isMoveBetweenTemplate(path: [number, number] | []): path is [number, number] {
  return path.length > 0;
}

function moveBetweenTemplate(list: OptTemplateApi[], [srcTemplatePos, srcPagePos]: [number, number], [destTemplatePos, destPagePos]: [number, number]) {
  try {
    const el = list[srcTemplatePos].pages_associated[srcPagePos];

    return produce(list, (draftState) => {
      draftState[srcTemplatePos].pages_associated.splice(srcPagePos, 1);
      draftState[destTemplatePos].pages_associated.splice(destPagePos, 0, el);
    });
  } catch (e) {
    return list;
  }
}

/**
 * return the index of template && of the page in associated page
 * @param list
 * @param id
 */
function getTemplateIdPath(list: OptTemplateApi[], id: string): [number, number] | [] {
  for(let templateIdx = 0; templateIdx < list.length; templateIdx++) {
    const pageIdx = list[templateIdx].pages_associated.findIndex(el => el.lp_id === id);
    if(pageIdx >= 0) {
      return [templateIdx, pageIdx];
    }
  }

  return [];
}

/**
 * simple wrap around immer for flat list
 * @param list
 * @param index
 */
function immutableDelete<T>(list: Array<T>, index: number) {
  return produce(list, (draftState) => {
    (draftState as Draft<Array<any>>).splice(index, 1);
  });
}

function immutableAdd<T>(list: Array<T>, index: number, el: T) {
  return produce(list, (draftState) => {
    (draftState as Draft<Array<any>>).splice(index, 0, el);
  });
}

/**
 * wrap around immer for nested list. Template list in this case
 * @param list
 * @param templateIdx
 * @param pageIdx
 * @param el
 */
function templatePageAddAt(list: Array<OptTemplateApi>, [templateIdx, pageIdx]: [number, number], el: OptPageItemApi) {
  return produce(list, (draftState) => {
    draftState[templateIdx].pages_associated.splice(pageIdx, 0, el);
  });
}

function templatePageDeleteAt(list: Array<OptTemplateApi>, [templateIdx, pageIdx]: [number, number]) {
  return produce(list, (draftState) => {
    draftState[templateIdx].pages_associated.splice(pageIdx, 1);
  });
}

function isTemplatePathValid(path: [number, number] | []): path is [number, number] {
  return path.length > 0;
}

const useStyles = makeStyles({
  root: {
    padding: 20
  },
  blockDivider: {
    padding: "15px 0"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

interface OptimizationPageProps {}

export default function OptimizationPage(_props: OptimizationPageProps) {
  const classes = useStyles({});

  const { optId } = useParams();
  const dispatch = useDispatch();
  const {
    pages_with_template,
    pages_without_template
  }: OptimizationPagesApi = useSelector((app: StoreState) => app.optimization.pages);

  const [templateList, setTemplatesList] = useState<OptTemplateApi[]>(pages_with_template);
  const [orphanPageList, setOrphanPageList] = useState<OptPageItemApi[]>(pages_without_template);

  useEffect(() => {
    setTemplatesList(pages_with_template);
  }, [pages_with_template]);

  useEffect(() => {
    setOrphanPageList(pages_without_template);
  }, [pages_without_template]);

  useEffect(() => {
    if(optId) {
      dispatch(tryGetOptimizationAction({ id: optId }));
    }
  }, [optId, dispatch]);

  function onDragEnd(result: DropResult) {
    if(!result.destination || !result.destination.droppableId) {
      return;
    }

    // droppableIds either hard coded (orphan)  or template id
    const dest = result.destination.droppableId;

    const { draggableId, source, destination } = result;
    // DROP TO ORPHAN
    if(dest === "orphan") {
      console.log(result);
      // if the dragged item is in orphan pages, it's swapping order
      // else orphan-> template with pages
      const itemPosition = orphanPageList.findIndex(el => el.lp_id === draggableId);
      if(itemPosition >= 0) {
        setOrphanPageList(
          swapItemOrder<OptPageItemApi>(orphanPageList, itemPosition, destination.index)
        );
        return;
      }

      const path = getTemplateIdPath(templateList, result.draggableId);
      if(isTemplatePathValid(path)) {
        const [templateIdx, pageIdx] = path;
        const draggedPage = templateList[templateIdx].pages_associated[pageIdx];

        setOrphanPageList(
          immutableAdd(orphanPageList, result.destination.index, draggedPage)
        );
        setTemplatesList(
          templatePageDeleteAt(templateList, path)
        );
      }
      return;
    }

    // DROP TO TEMPLATE
    const path = moveBetweenTemplatePath(templateList, source.droppableId, destination.droppableId);

    if(isMoveBetweenTemplate(path)) {
      const [srcTemplatePosition, destTemplatePosition] = path;
      setTemplatesList(
        moveBetweenTemplate(templateList, [srcTemplatePosition, source.index], [destTemplatePosition, destination.index])
      );
      return;
    }
    // from orphan to template pages
    const templatePosition = templateList.findIndex(el => el.template_id === destination.droppableId);
    const el = orphanPageList[source.index];

    if(templatePosition >= 0) {
      setTemplatesList(
        templatePageAddAt(templateList, [templatePosition, destination.index], el)
      );
      setOrphanPageList(
        immutableDelete(orphanPageList, source.index)
      );
    }
  }

  return <section className={classes.root}>
    <DragDropContext onDragEnd={onDragEnd}>
      <OptOrphanPages pages={orphanPageList}/>

      <div className={classes.blockDivider}>
        <AppText bold="bold"
          text="Drop pages to corresponding to their templates here"/>
      </div>

      <OptTemplateList templateList={templateList}/>
    </DragDropContext>

    <footer className={classes.actions}>

      <OptLinkTemplateBtn templateList={templateList}/>
    </footer>
  </section>;
}
