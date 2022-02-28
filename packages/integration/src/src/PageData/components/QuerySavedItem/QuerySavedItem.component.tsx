import makeStyles from "@mui/styles/makeStyles";
import { Button } from "src/deps";
import { AppBtnLink } from "src/components/AppBtnLink/AppBtnLink.component";
import { MouseEvent as ReactMouseEvent } from "react";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { tryDeleteAnalyticsQueryAction } from "../../store/queryEpic$";
import { SavedQueryItem } from "../../model/analytics";
import { AppText } from "../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "15px 0"
  },
  border: {
    padding: 15,
    border: theme.shape.border.solidGrey
  },
  title: {
    fontWeight: 500,
    fontSize: "1.3em"
  },
  subTitle: {
    padding: "10px 0"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  links: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "60%",
    alignItems: "center"
  }
}));

interface QuerySavedItemProps {
    datum: SavedQueryItem;
}

// DO NOT ADD edit criteria. it was scrapped
/**
 * yo man, @Ken i talked with @Yahia AIT OUAKLI about edit, we decided we don't need it anymore.
 */

export function QuerySavedItem({ datum }: QuerySavedItemProps) {
  const classes = useStyles({});

  const dispatch = useDispatch();
  const paramsState = useSelector((state: StoreState) => state.analyticsQuery.queryState);

  function deleteQuery(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(tryDeleteAnalyticsQueryAction({ id: datum.search_id, qState: paramsState }));
  }

  return (
    <article className={classes.root}>
      <div className={classes.border}>
        <AppText text={datum.search_name} props={{ classes: { root: classes.title }, variant: "h2" }}/>
        <AppText capitalize="first" text={`created ${datum.date}`}
          props={{ classes: { root: classes.subTitle } }}/>

        <AppText text='some text'/>
        <footer className={classes.actions}>
          <ul className={classes.links}>
            <li>
              <AppBtnLink uri={`/data/analytic/${datum.search_id}/table/`}
                label="check results"/>
            </li>
            <li>
              <AppText text='message match'/>

            </li>
          </ul>

          <AppBtn color="secondary" onClick={deleteQuery}>
            delete saved query
          </AppBtn>
        </footer>

      </div>

    </article>
  );
}
