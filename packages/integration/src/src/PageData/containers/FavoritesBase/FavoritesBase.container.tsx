import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Button, useTheme, Divider} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContainerStyle, useGlobalPageStyle } from "./FavoritesBase.container.style";
interface OptimizationProps {}

export default function Optimization(_props: OptimizationProps) {
  const classes = useContainerStyle();
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <section className={classes.baseContainer}>
      <AppBar position="static" color='primary' className={classes.colorPrimary}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h1" component="div" sx={{marginBottom: "15px"}}>
            Analytics & Optimizations
          </Typography>
          <div className={classes.backButton}>
            <IconButton
                onClick={() => navigate(-1)}
                aria-label="delete"
                sx={{border: "1px solid black", borderRadius: "50%", marginRight: "15px"}}
                size="large">
              <ArrowBackIcon fontSize='small' sx={{color: theme.palette.black, fontWeight: "700px"}} />
            </IconButton>
            <Typography variant='subtitle1' sx={{marginBottom: "none", fontSize: "16px"}} >Back</Typography>
          </div>
        </Toolbar>
        <Divider />
      </AppBar>

      <Outlet/>

    </section>
  );
}
