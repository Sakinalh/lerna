import React, { useState } from "react";
import { Grid, Radio } from "@mui/material";
import { AppBtn } from "../../../../../components/AppBtn/AppBtn.component";
import { AppTag } from "../../../../../components/AppTag/AppTag.component";

interface SuggestionItemProps {
  pct: number;
  value: string;
  index: number;
  handleSuggestionsChoose: any;
  currentChoose: string;
}

export function SuggestionItem(props: SuggestionItemProps) {
  const {
    pct = null,
    value = "",
    index = "",
    handleSuggestionsChoose,
    currentChoose
  } = props;

  const onValueChange = () => {
    handleSuggestionsChoose(value);
  };

  return (
    <Grid
      container
      className="tabLine tabLine--suggestion"
      alignItems="center"
      justifyContent="space-between"
      onClick={onValueChange}
    >
      <Grid item>
        <Radio
          checked={value === currentChoose}
          value={value}
          name="textSelect"
          className="tabLine__radio radio radio--little"
        ></Radio>

        <div className="tabLine__container">
          <span title={value} className="tabLine__title ellipsis">
            {value}
          </span>
          <AppTag customclass="tabLine__tag" stateColor="more">
            {`${pct} %`}
          </AppTag>
        </div>
      </Grid>
      <AppBtn
        fluid
        noPadding
        typeBtn="PageCardPreview"
        customclass="tabLine__btn tabLine__btn--hover"
      >
        CHOOSE
      </AppBtn>
    </Grid>
  );
}
