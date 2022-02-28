import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Typography, Chip} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { ReactComponent as ExpandIcon } from "src/assets/expand.svg";
import { useNavigate, createSearchParams} from "react-router-dom";
import { useStyles } from "./PaginatedBlockKpis.style";

export default function PaginatedBlockKpis({data: {kpis}}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();
  const [isKpiModalOpen, setIsKpiModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getChipColor = () => {
    if(!kpis[activeStep].evolution) {
      return "";
    }
    const {sign} = kpis[activeStep].evolution;
    return sign === "+" ? "success" : "error";
  };

  const buildEvolutionContent = () => {
    if(!kpis[activeStep].evolution) {
      return "";
    }
    const evolution = kpis[activeStep].evolution;

    const evolutionContent = evolution?.sign +""+ evolution?.value;
    if(evolution.unit !== "null") {
      evolutionContent.concat("", evolution.unit);
    }

    return evolutionContent;
  };

  const openKpisModal= () => {
    navigate("/data/analytic/recommendation/all-kpis", {state: kpis});

    setIsKpiModalOpen(true);
  };

  return (
    <Card className={classes.root}
      title="">
      <ExpandIcon className={classes.iconExpand} onClick={openKpisModal}/>
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{kpis[activeStep].name.capitalizeFirstLetter()}</Typography>
        <Typography className={classes.slider} variant='h1' component='div'>
          <KeyboardArrowLeft onClick={handleBack} color='secondary' />
          {kpis[activeStep].value +""+ kpis[activeStep].unit}
          <KeyboardArrowRight onClick={handleNext} color='secondary' />
        </Typography>
        {kpis[activeStep].has_evolution && <Chip
            className={classes.chipContent}
            label={buildEvolutionContent()} color={getChipColor()}/>}
      </CardContent>
    </Card>
  );
}
