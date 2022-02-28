import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";
import { LinkExt } from "src/components/LinkExt/LinkExt.component";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { forwardRef } from "react";
import { OptPageItemApi } from "../../../model";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 60,
    minWidth: "100%"
  }, // set min width and height->droppable zone even on empty list
  templateRow: {
    padding: "10px 0"
  },
  templateItem: {
    border: `1px solid ${theme.palette.blue.light}`,
    padding: "15px 10px"
  }

}));

interface OptPageListProps {
    list: OptPageItemApi[];
    ref: DroppableProvided
}

export const OptPageList = forwardRef<DroppableProvided, OptPageListProps>(({ list }, forwardedRef) => {
  const classes = useStyles({});

  if(!forwardedRef) {
    return <p> failed to display list </p>;
  }
  return <div className={classes.root}
    ref={(forwardedRef as any).innerRef}
    {...(forwardedRef as any).droppableProps}>
    {list.map((m, idx) => (
      <Draggable draggableId={m.lp_id}
          index={idx}
          key={m.lp_id}>
        {providedDraggable => (
          <div className={classes.templateRow}>
            <div ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                {...providedDraggable.dragHandleProps}
                className={classes.templateItem}>
              <AppText text={m.lp_title}/>
              <LinkExt link={m.lp_url} label={m.lp_url}/>
            </div>
            {/*
                            {providedDraggable.placeholder}
*/}
          </div>
        )}
      </Draggable>))}
    {(forwardedRef as any).placeholder}
  </div>;
});
