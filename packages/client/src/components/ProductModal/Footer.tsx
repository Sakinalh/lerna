import { Grid } from "@mui/material";
import { DEFAULT_LIMIT } from "src/shared/constants/constants";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { Paginator } from "./Paginator.component";

interface FooterInterface {
    onApply : () => void;
    onCancel: () => void;
    totalItems: number;
    nbProductSelected: number;
    paginate: (page: number) => void;
    resetPaginationPage?: boolean;
  }

export const Footer: React.FC<FooterInterface> = ({resetPaginationPage = false, paginate, onApply, onCancel, totalItems, nbProductSelected = 0 }) => (<footer className="container__footer">
  <Grid justifyContent="space-between" alignItems="center" container>
    { <Paginator resetPaginationPage={resetPaginationPage} paginate={paginate} totalItems={totalItems} nbItemsPerPage={DEFAULT_LIMIT} /> }

    <Grid justifyContent="flex-end" item className="container__right">
      <Grid
         className="container__right--elem"
         container
         justifyContent="space-between"
         alignItems="center"
       >
        <span className="container__footer--txt">{nbProductSelected} products selected</span>
        <div className="container__btns">
          <AppBtn typeBtn="customSimple" noPadding onClick={onCancel}>
            Cancel
          </AppBtn>
          <AppBtn typeBtn="customPrimary" noPadding onClick={onApply} disabled={nbProductSelected <= 0}>
            Add
          </AppBtn>
        </div>
      </Grid>
    </Grid>
  </Grid>

</footer>);