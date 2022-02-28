import { Grid } from "@mui/material";
import { DEFAULT_LIMIT } from "src/shared/constants/constants";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { Paginator } from "../ProductModal/Paginator.component";

interface FooterInterface {
    onApply : () => void;
    onCancel: (value: boolean) => void;
    totalItems: number;
    nbProductSelected?: number;
    disableApply?: boolean;
    paginate: (page: number) => void;
    resetPaginationPage?: boolean;
  }

export const Footer: React.FC<FooterInterface> = ({resetPaginationPage = false, paginate, onApply, onCancel, totalItems, disableApply}) => (<footer className="container__footer">
  <Grid justifyContent="space-between" alignItems="center" container>
    { <Paginator resetPaginationPage={resetPaginationPage} paginate={paginate} totalItems={totalItems} nbItemsPerPage={DEFAULT_LIMIT} /> }

    <Grid justifyContent="flex-end" item className="container__right">
      <Grid
         className="container__right--elem"
         container
         justifyContent="space-between"
         alignItems="center"
       >
        <div className="container__btns">
          <AppBtn typeBtn="customSimple" onClick={e => onCancel(true)}>
            Cancel
          </AppBtn>
          <AppBtn typeBtn="customPrimary" onClick={onApply} disabled={false} >
            Replace
          </AppBtn>
        </div>
      </Grid>
    </Grid>
  </Grid>

</footer>);