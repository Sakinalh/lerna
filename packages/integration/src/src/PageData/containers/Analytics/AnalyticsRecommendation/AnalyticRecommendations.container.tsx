import { Outlet, useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import { SyntheticEvent as ReactSyntheticEvent, useState } from "react";
import { AppSelectRadio } from "src/components/AppSelectRadio/AppSelectRadio.component";
import { useQuery } from "react-query";
import { getDateRanges } from "src/api/react-query/filters.store";
import { Typography, IconButton, useTheme, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStyles } from "./AnalyticsRecommendation.style";
import { FavSearchListModal } from "../SearchListModals/FavSearchListModal.component";

export default function AnalyticsRecommendationsPage() {
  const classes = useStyles({});
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { isSuccess, data: ranges, isFetching} = useQuery("dateRanges", getDateRanges);

  return <section className={classes.root}>
    <header className="header header--recommendation">
      <Typography className="header__title" component="h2" variant="h1">Analytics & Recommendations</Typography>
      <Divider sx={{height: 23}} component='span' orientation='vertical' variant='middle' />
      <Typography className="header__baseline ellipsis" component="p" variant="subtitle2">Lorem ipsum dolor at met decoazer azer azer azer azer azer azer azer azer azr rata...</Typography>
    </header>

    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        <div className={classes.backButton}>
          <IconButton
                    onClick={() => navigate(-1)}
                    aria-label="delete"
                    sx={{border: "1px solid black", borderRadius: "50%", marginRight: "8px", height: 32, width: 32}}
                    size="large">
            <ArrowBackIcon fontSize='small' sx={{color: theme.palette.black, fontWeight: "700px"}} />
          </IconButton>
          <Typography variant='subtitle1' sx={{marginBottom: "none", fontSize: "16px"}} >Back</Typography>
        </div>
      </div>
      <div className={classes.aside}>
        <AppSelectRadio items={ranges}/>
        <Button disableElevation={true} onClick={() => setOpen(true)} variant="outlined" startIcon={<StarBorderIcon fontSize="small" />}>
          MySearchs
        </Button>
      </div>
    </div>
    <FavSearchListModal openModal={open} onClose={() => setOpen(false)} />

    <Outlet />

  </section>;
}