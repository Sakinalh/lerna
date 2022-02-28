import clsx from "clsx";
import { FormControlLabel, Tooltip, Typography } from "@mui/material";
import { useStyles } from "./KeywordListItem.style";
import { AppCheckbox } from "../AppCheckbox/AppCheckbox.component";
import { AppTooltip } from "..";

export interface KeywordListItemProps {
  label: string;
  tooltip: string;
  value: number;
  isSelected: boolean;
  category: any;
  onSelectKeyword: (value: number) => void;
  totalPages: number;
  isCheckedToBePublished?: boolean;
  onCheckKeyword: (value: number) => void;
}

export const KeywordListItem: React.FC<KeywordListItemProps> = (props) => {
  const classes = useStyles();

  const {
    isSelected = false,
    label = "test  lavbebl",
    value = 4,
    tooltip = "Number of recommendations",
    totalPages = 0,
    isCheckedToBePublished = false,
    category
  } = props;
  return (
    <div data-id={value} className={clsx("keyword", classes.root, { isSelected: isSelected })}>
      { category && category.name !== "linked" && (<div className={clsx("keyword__checkbox--container", { isCheckedToBePublished: isCheckedToBePublished})}>
        <div className={"keyword__checkbox"}>
          <AppCheckbox
              customClass="beforeCheckBox"
              isSmall
              whiteBg
              checked={isCheckedToBePublished}
              onChange={() => props.onCheckKeyword(value)}
              color="primary"
              disableRipple={true}
            />
        </div>
        </div>)}

      <div className={clsx("keyword__label", category && category.name === "linked" && "keyword__label--linked")} onClick={() => props.onSelectKeyword(value)}>
        <Typography
            className="keyword__label--txt ellipsisMulti"

          >
          {label}
        </Typography>
      </div>

      <AppTooltip
          classes={{
            tooltip: "tooltip"
          }}
          placement="top"
          title={<div className="tooltip__container "><p className="tooltip__container--center">{tooltip}</p></div>}
          aria-label="add"
          arrow
        >
        <span className="keyword__number">{totalPages}</span>
      </AppTooltip>
    </div>
  );
};
