import { Paper, Typography, CardContent, Card, Chip, useTheme } from "@mui/material";
import { ReactComponent as Minimize } from "src/assets/minimize.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useStyles } from "./KpisModal.style";

export default function KpisModal() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const kpis = location.state;

  const onClose = () => {
    navigate(-1);
  };

  const getChipColor = (kpi) => {
    if(!kpi.evolution) {
      return "";
    }
    const {sign} = kpi.evolution;
    return sign === "+" ? "success" : "error";
  };

  const buildEvolutionContent = (kpi) => {
    if(!kpi.evolution) {
      return "";
    }
    const evolution = kpi.evolution;

    const evolutionContent = evolution?.sign +""+ evolution?.value;
    if(evolution.unit !== "null") {
      evolutionContent.concat("", evolution.unit);
    }

    return evolutionContent;
  };

  const buildKpiValue = (kpi) => {
    let value = kpi.value;

    if(kpi.unit) {
      value = value +""+ kpi.unit;
    }

    return value;
  };
  const getCells = (index) => {
    const cells = [];
    for(let i = 0; i <= 3; i++) {
      cells.push(
        <td>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1" sx={{ textAlign: "center"}}>{kpis[index].name}</Typography>
              <Typography variant='h1' sx={{fontWeight: 600}} component='div'>{buildKpiValue(kpis[index])}</Typography>
              {kpis[index].has_evolution && <Chip
                                className={classes.chipContent}
                                label={buildEvolutionContent(kpis[index])} color={getChipColor(kpis[index])}/>}
            </CardContent>
          </Card>
        </td>
      );
    }
    return cells;
  };

  const getRow = (index: number) => {
    const row = (<tr>
      {getCells(index)}
    </tr>);
    return row;
  };

  const getNbRows = () => (kpis.length / 4);

  const displayContent = () => {
    let currentIdx = 0;
    const content = [];
    while(i < getNbRows()) {
      content.push(getRow(currentIdx));
      i++;
      currentIdx++;
    }
    return content;
  };

  let i = 0;

  return <div className={classes.container}>
    <Paper elevation={0} className={classes.root} >
      <Minimize className={classes.minimizeIcon} sx={{cursor: "pointer"}} onClick={onClose}/>
      <Typography className={classes.tableTitle} variant='h2'>ALL ASSOCIATED KPI</Typography>
      <div className={classes.table}>
        <table >
          {displayContent()}
        </table>
      </div>
    </Paper>
  </div>;
}