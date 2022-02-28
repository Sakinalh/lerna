import { QueueListInterface, SelectableKwdPages, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent as ReactMouseEvent } from "react";
import {
  BatchDeletePageFromQueueActionPayload,
  tryBatchDeletePageFromQueueAction
} from "src/PageGeneration/store/sem.epic";
import { setModalActionStateAction } from "src/PageGeneration/store/shared.epic";
import { GenerationCancelBtn } from "../../shared/GenerationCancelBtn/GenerationCancelBtn.component";

function makeActionPayload(selection: SelectableKwdPages): BatchDeletePageFromQueueActionPayload {
  return Object.keys(selection).reduce((acc: { ruleId: number; kdwId: number; pageId: string; }[], curr: string) => {
    if(selection[curr].isSelected) {
      const sel = selection[curr];
      return acc.concat([
        {
          ruleId: sel.ruleId,
          kdwId: parseInt(curr),
          pageId: sel.selectedPage
        }
      ]);
    }

    return acc;
  }, []);
}

interface DismissAllBtnProps {}

export function DismissAllBtn(_props: DismissAllBtnProps) {
  const {
    selectedKeywords
  }: QueueListInterface = useSelector((state: StoreState) => state.pageQueue);
  const dispatch = useDispatch();

  function dismissAll(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const actionPayload = makeActionPayload(selectedKeywords);
    dispatch(setModalActionStateAction({
      state: "start",
      action: tryBatchDeletePageFromQueueAction(actionPayload),
      msg: `Do  you want to  permanently remove ${actionPayload.length} page(s)  ?`
    }));
  }

  return <GenerationCancelBtn onClick={dismissAll} label='dismiss selected page'/>;
}
