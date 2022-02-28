import makeStyles from "@mui/styles/makeStyles";
import { FormControlLabel } from "src/deps";
import { CollectionNameApi } from "src/PageGeneration/model";
import {
  OutlinedCheckboxCheckedIcon,
  OutlinedCheckboxIcon
} from "src/PageGeneration/shared/style";
import * as TRANSLATE from "src/shared/translation/en.json";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AppText } from "src/components/AppText/AppText.component";
import { ChangeEvent as ReactChangeEvent } from "react";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    padding: "10px 30px 15px",
    margin: "20px 0",
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin,
    fontSize: "1.2em"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin,
    padding: "0 10px",
    opacity: 0.7,
    marginTop: 15
  },
  checkbox: {
    width: 16,
    height: 16
  }
}));

function _setCheckValue(datum: Record<string, boolean>, key: number) {
  return datum.hasOwnProperty(key) ? datum[key] : false;
}

interface DetailQuerySelectProps {
  selectQ: Record<string, boolean>;
  onSelect: Function;
}

export function DetailQuerySelect(props: DetailQuerySelectProps) {
  const classes = useStyles(props);
  const { selectQ, onSelect } = props;
  // const dispatch = useDispatch();
  const collectionNames: CollectionNameApi[] = useSelector(
    (state: StoreState) => state.ruleDetail.collections.names.results
  );

  /*    React.useEffect(() => {
            dispatch(tryGetCollectionsNamesAction());

        }, [dispatch]); */

  function getCollections(ids: string[]) {
    return ids.reduce((acc: CollectionNameApi[], curr: string) => {
      const match = collectionNames.find(
        c => c.collection_id.toString() === curr
      );
      return match ? [...acc, ...[match]] : acc;
    }, []);
  }

  const handleChange = (event: ReactChangeEvent<HTMLInputElement>) => {
    const _u = { ...selectQ, [event.target.name]: event.target.checked };
    onSelect({ selection: _u, data: getCollections(Object.keys(_u)) });
  };

  return (
    <article className={classes.root}>
      <AppText text={TRANSLATE.shared.savedQueries} />
      <div className={classes.content}>
        {collectionNames.map((q, idx) => (
          <FormControlLabel
              key={`${q.collection_id}_${idx}`}
              control={
                <AppCheckbox
                  whiteBg
                  checked={_setCheckValue(selectQ, q.collection_id)}
                  onChange={handleChange}
                  name={q.collection_id.toString()}
                  color="secondary"
                  inputProps={{ "aria-label": "labelId" }}
                  icon={<OutlinedCheckboxIcon size="lg" />}
                  checkedIcon={<OutlinedCheckboxCheckedIcon size="lg" />}
                />
              }
              label={q.collection_name}
            />
        ))}
      </div>
    </article>
  );
}
