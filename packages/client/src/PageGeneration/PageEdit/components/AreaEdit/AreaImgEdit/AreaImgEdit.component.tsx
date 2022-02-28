import React from "react";
import clsx from "clsx";
import { Grid, Radio } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { AppPagination } from "src/components";
import { CardImg } from "../../../../components/CardImg/CardImg.component";
import { AppSwitch } from "../../../../../components/AppSwitch/AppSwitch.component";
import { ReactComponent as Delete } from "../../../../../styles/global/icons/delete.svg";
import { ReactComponent as Edit } from "../../../../../styles/global/icons/edit.svg";
import { ReactComponent as Replace } from "../../../../../styles/global/icons/replace.svg";
import { EditProductModal } from "../../../../../PageGeneration/components/EditProductModal/EditProductModal.component";

export interface AreaImgEditProps {}

export function AreaImgEdit(props: AreaImgEditProps) {
  const [cardDrag, setCardDrag] = React.useState([
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" }
  ]);

  const handleDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(cardDrag);
    const [reorderdItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderdItem);

    setCardDrag(items);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className="pageDetails__header">
          <h2 className="pageDetails__title pageDetails__title--mb">Area 1</h2>
          <h3 className="pageDetails__productTitle ">sub</h3>
        </Grid>
        <Grid item>
          <Grid
            className="pageDetails__actions"
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <AppSwitch
              after="Show Filters"
              // eslint-disable-next-line
              onToggle={() => console.log("onToggle")}
              isActivated={false}
            />
            <AppBtn onClick={handleOpen} typeBtn="secondary">
              <span>Upload Image</span>
            </AppBtn>
          </Grid>
        </Grid>
      </Grid>

      <div className="isOverflow">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="card">
            {(provided, snapshot) => (
              <Grid
                spacing={3}
                container
                alignItems="center"
                justifyContent="space-between"
                {...provided.droppableProps}
                className={clsx(
                  "cardImgs",
                  "drop",
                  snapshot.draggingFromThisWith && "drop--draggingFromThisWith",
                  snapshot.draggingOverWith && "drop--draggingOverWith",
                  snapshot.isDraggingOver && "drop--draggingOver",
                  snapshot.isUsingPlaceholder && "drop--usingPlaceholder"
                )}
                ref={provided.innerRef}
              >
                {cardDrag.map((value, index) => (
                  <Draggable
                      key={value.id}
                      draggableId={value.id}
                      index={index}
                    >
                    {(provided, snapshot) => (
                      <Grid lg={3} xl={2} md={4} item>
                        <div className="falseZone">
                          <div
                              className={clsx(
                                "snap",
                                snapshot.isDragging && "snap--dragging",
                                snapshot.isDropAnimating &&
                                  "snap--dropAnimating"
                              )}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              {...snapshot.isDragging}
                              ref={provided.innerRef}
                            >
                            <CardImg
                                onlyImg
                                pct={80}
                                footer={true}
                                actions={
                                  <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                  >
                                    <Grid item>
                                      <Radio
                                        disableRipple={true}
                                        focusRipple={true}
                                        classes={{
                                          root:
                                            "radio radio--root radio--little"
                                        }}
                                      />
                                    </Grid>
                                    <Grid className="cardImg__icons" item>
                                      <Delete />
                                    </Grid>
                                  </Grid>
                                }
                              ></CardImg>
                          </div>
                        </div>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <EditProductModal
                  openCallback={open}
                  onHandleCloseCallback={handleClose}
                />
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
