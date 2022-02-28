import { AppError } from "src/model";
import { clearAppErrorStateAction } from "src/redux/store/app";
import { useDispatch } from "react-redux";
import { Grow, IconButton, Snackbar } from "src/deps";
import { Close, ErrorOutline } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    minWidth: 250,
    padding: 10,
    boxShadow: "0 3px 6px 0 rgba(31,39,42,.18)",
    height: 30,
    color: "#f0767e",
    borderRadius: 6,
    fontSize: 18,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  actions: {},
  icon: {
    padding: 0,
    position: "absolute",
    right: 10,
    fontSize: 18
  },
  content: {
    display: "flex",
    alignItems: "center"
  },

  msg: {
    paddingLeft: 30,
    fontWeight: 600,
    fontSize: 10
  }
});

export function ErrorNotification(_props): JSX.Element | null {
  const classes = useStyles({});
  // const error: AppError = useSelector((state: StoreState) => state.app.error);
  // const NOTIFICATION_DURATION = 4000;
  const error: AppError = { hasError: false, msg: "" };
  const dispatch = useDispatch();

  function dismiss() {
    dispatch(clearAppErrorStateAction());
  }

  /*

        useEffect(() => {
            const obs$ = of(null).pipe(
                delay(NOTIFICATION_DURATION),
                tap(
                    () => {
                        dispatch(clearAppErrorStateAction());
                    }
                )
            );

            const sub = obs$.subscribe();
            return () => {
                sub.unsubscribe();

            }

        }, [error.hasError, dispatch])
    */

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      key="top,right"
      open={error.hasError}
      TransitionComponent={Grow}
    >
      <div className={classes.root}>
        <div className={classes.content}>
          <ErrorOutline fontSize="inherit"/>
          <AppText text={error.msg} props={{ variant: "caption", classes: { root: classes.msg } }}/>
          <IconButton className={classes.icon} onClick={dismiss} size="large">
            <Close fontSize="inherit"/>
          </IconButton>
        </div>
      </div>
    </Snackbar>
  );
}
