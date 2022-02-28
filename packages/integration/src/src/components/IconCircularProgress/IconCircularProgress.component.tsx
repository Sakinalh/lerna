// import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { ReactComponent as CheckElem } from "src/styles/global/icons/checkElem.svg";
import {IconCircularProgressStyles} from "./IconCircularProgress.styles";

export interface IconCircularProgressProps {
  value: number;
  total: number;
}

export const IconCircularProgress: React.FC<IconCircularProgressProps> = ({value = 0, total = 0}) => {
  const DEFAULT_PERIMETER = 22;
  const pct = value * 100 / total;
  const classes = IconCircularProgressStyles({pct, DEFAULT_PERIMETER});

  const isCompleted = total === value;
  return (
    <span className={clsx(classes.root, "queueTab__input  queueTab__input--progress")}>
      <div className={clsx("progressCircle", isCompleted && "isComplete")}>
        <svg width="18" height="18" className="progressCircle__svg">
          <circle r="3.5" cx="9" cy="9" className="progressCircle__circle"/>
          <circle r="3" cx="9" cy="9" className="progressCircle__center"/>
        </svg>

        <CheckElem className="progressCircle__check"/>

      </div>
      <span>{value}/{total}</span>
    </span>
  );
};
