import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { FormControlLabel, Radio, RadioGroup } from "src/deps";
import { useDispatch, useSelector } from "react-redux";
import { patchSelectionQueueAction } from "src/PageGeneration/store/queue.epic";
import { TemplateKeywordApi } from "src/PageGeneration/model";
import clsx from "clsx";
import { QueueRow } from "../../QueueRow/QueueRow.component";
import { QueueCell } from "../../QueueCell/QueueCell.component";
import { CELL_HEAD } from "../QueueTableCol/QueueTableCol.component";

const useStyles = makeStyles(theme => ({
  col: {},
  cell: {
    borderLeft: "1px solid #F2F2F2"
  },
  col_head: {
    position: "relative",
    ...CELL_HEAD,
    width: "100%"
  },

  radio: {
    margin: 0,
    width: "60%",
    paddingLeft: "5%"
  },
  colorRadio: {
    color: theme.palette.grey.middle1
  },
  input: {
    width: "inherit"
  },
  hide: {
    opacity: 0
  }
}));

interface QueuePageSelectColProps {
    keywords: TemplateKeywordApi[];
}

export function QueuePageSelectCol(props: QueuePageSelectColProps) {
  const classes = useStyles({});
  const { keywords } = props;
  const selectedPages = useSelector(
    (state: StoreState) => state.pageQueue.selectedKeywords
  );
  const dispatch = useDispatch();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    kwdId: number
  ) => {
    const value = (event.target as HTMLInputElement).value;
    dispatch(
      patchSelectionQueueAction({ key: kwdId, value: { selectedPage: value } })
    );
  };

  function radioSelectValue(kwdId: number) {
    // in case kdw id is not defined for some reason

    if(selectedPages[kwdId]) {
      return kwdId ? selectedPages[kwdId].selectedPage : false;
    }
    return false;
  }

  return (
    <div className={classes.col}>
      <div className={classes.col_head}/>
      <ul>
        {keywords && keywords.map((kwd, _kwd_idx) => (
          <QueueRow
              key={`${kwd.keyword_id}_radio_${_kwd_idx}`}
              pageCount={kwd.pages.length}>
            <RadioGroup
                aria-label="zone"
                name="zone"
                value={radioSelectValue(kwd.keyword_id)}
                onChange={e => handleChange(e, kwd.keyword_id)}
                classes={{ root: clsx(classes.input, { [classes.hide]: kwd.pages.length < 2 }) }}
              >
              {kwd.pages && kwd.pages.map((k, _page_idx) => (
                <QueueCell
                      node={"div"}
                      key={`${k.page_id}_check_${_page_idx}`}
                    >
                  <FormControlLabel
                        value={k.page_id}
                        control={<Radio classes={{ root: classes.colorRadio }}/>}
                        label={null}
                        classes={{
                          root: classes.radio,
                          label: "ellipsis"
                        }}
                      />
                </QueueCell>
              ))}
            </RadioGroup>

          </QueueRow>
        ))}

      </ul>
    </div>
  );
}
