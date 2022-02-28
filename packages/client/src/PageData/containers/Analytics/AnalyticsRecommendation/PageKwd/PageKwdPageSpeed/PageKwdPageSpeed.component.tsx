import { Typography, Link, Grid, Box, useTheme, Button, Skeleton } from "@mui/material";
import React, { useState } from "react";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import { getBackgroundTag } from "src/shared/utils";
import { ReactComponent as Lightouse } from "src/assets/img/lighthouse.svg";
import {formatDistanceToNow } from "date-fns";
import { PieChartSpeed } from "./PieChartSpeed/PieChartSpeed.component";
import { useStyles } from "./PageKwdPageSpeed.style";

interface PageKwdPageSpeedProps { }

export const PageKwdPageSpeed: React.FC<PageKwdPageSpeedProps> = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [detailsView, setDetailsView] = useState(false);
  const onToggleDevice = (value: boolean) => { setIsMobile(!value); };
  const classes = useStyles(isMobile);
  const IsFetching = false;
  const newData = {
    "lastScanned": "2021-12-07T12:46:42.483Z",
    "pageURL": "http://www.appitel.fr/",
    "mobile": {
      "reportURL": "http://www.appitel.fr",
      "performance": {
        "score": 0.88,
        "displayValue": "88 %",
        "ranges": [

          {
            "start": 0,
            "end": 49,
            "category": "poor",
            "color": "red"
          },
          {
            "start": 50,
            "end": 89,
            "category": "avg",
            "color": "yellow"
          },
          {
            "start": 90,
            "end": 100,
            "category": "good",
            "color": "green"
          }

        ]
      },
      "audits": [
        {
          "id": "first contentful paint",
          "score": 0.94,
          "numericValue": 821.484,
          "numericUnit": "millisecond",
          "displayValue": "0.8 s",
          "ranges": [
            {
              "start": 0,
              "end": 1.8,
              "category": "good",
              "color": "green"
            },
            {
              "start": 1.9,
              "end": 3,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 3.1,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "interactive",
          "score": 1,
          "numericValue": 861.484,
          "numericUnit": "millisecond",
          "displayValue": "0.9 s",
          "ranges": [
            {
              "start": 0,
              "end": 3.8,
              "category": "good",
              "color": "green"
            },
            {
              "start": 3.9,
              "end": 7.3,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 7.4,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "speed index",
          "score": 0.99,
          "numericValue": 821.484,
          "numericUnit": "millisecond",
          "displayValue": "0.8 s",
          "ranges": [
            {
              "start": 0,
              "end": 3.4,
              "category": "good",
              "color": "green"
            },
            {
              "start": 3.5,
              "end": 5.8,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 5.9,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "total blocking time",
          "score": 1,
          "numericValue": 0,
          "numericUnit": "millisecond",
          "displayValue": "0 ms",
          "ranges": [
            {
              "start": 0,
              "end": 200,
              "category": "good",
              "color": "green"
            },
            {
              "start": 201,
              "end": 600,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 601,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "largest contentful paint",
          "score": 0.8,
          "numericValue": 1510.6150000000002,
          "numericUnit": "millisecond",
          "displayValue": "1.5 s",
          "ranges": [
            {
              "start": 0,
              "end": 2.5,
              "category": "good",
              "color": "green"
            },
            {
              "start": 2.6,
              "end": 4,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 4.1,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "cumulative layout shift",
          "score": 0.61,
          "numericValue": 0.20512105710001755,
          "numericUnit": "unitless",
          "displayValue": "0.205",
          "ranges": [
            {
              "start": 0,
              "end": 0.1,
              "category": "good",
              "color": "green"
            },
            {
              "start": 0.11,
              "end": 0.25,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 0.26,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        }
      ]
    },
    "desktop": {
      "reportURL": "http://www.appitel.fr",
      "performance": {
        "score": 0.88,
        "displayValue": "88 %",
        "ranges": [
          {
            "start": 0,
            "end": 49,
            "category": "poor",
            "color": "red"
          },
          {
            "start": 50,
            "end": 89,
            "category": "avg",
            "color": "yellow"
          },
          {
            "start": 90,
            "end": 100,
            "category": "good",
            "color": "green"
          }
        ]
      },
      "audits": [
        {
          "id": "first contentful paint",
          "score": 0.94,
          "numericValue": 821.484,
          "numericUnit": "millisecond",
          "displayValue": "0.8 s",
          "ranges": [
            {
              "start": 0,
              "end": 1.8,
              "category": "good",
              "color": "green"
            },
            {
              "start": 1.9,
              "end": 3,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 3.1,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "interactive",
          "score": 1,
          "numericValue": 861.484,
          "numericUnit": "millisecond",
          "displayValue": "0.9 s",
          "ranges": [
            {
              "start": 0,
              "end": 3.8,
              "category": "good",
              "color": "green"
            },
            {
              "start": 3.9,
              "end": 7.3,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 7.4,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "speed index",
          "score": 0.99,
          "numericValue": 821.484,
          "numericUnit": "millisecond",
          "displayValue": "0.8 s",
          "ranges": [
            {
              "start": 0,
              "end": 3.4,
              "category": "good",
              "color": "green"
            },
            {
              "start": 3.5,
              "end": 5.8,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 5.9,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "total blocking time",
          "score": 1,
          "numericValue": 0,
          "numericUnit": "millisecond",
          "displayValue": "0 ms",
          "ranges": [
            {
              "start": 0,
              "end": 200,
              "category": "good",
              "color": "green"
            },
            {
              "start": 201,
              "end": 600,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 601,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "largest contentful paint",
          "score": 0.8,
          "numericValue": 1510.6150000000002,
          "numericUnit": "millisecond",
          "displayValue": "1.5 s",
          "ranges": [
            {
              "start": 0,
              "end": 2.5,
              "category": "good",
              "color": "green"
            },
            {
              "start": 2.6,
              "end": 4,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 4.1,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        },
        {
          "id": "cumulative layout shift",
          "score": 0.61,
          "numericValue": 0.20512105710001755,
          "numericUnit": "unitless",
          "displayValue": "0.205",
          "ranges": [
            {
              "start": 0,
              "end": 0.1,
              "category": "good",
              "color": "green"
            },
            {
              "start": 0.11,
              "end": 0.25,
              "category": "avg",
              "color": "yellow"
            },
            {
              "start": 0.26,
              "end": null,
              "category": "poor",
              "color": "red"
            }
          ]
        }
      ]
    }
  };

  function setShape(value) {
    let pct = null;
    let color = null;
    let shape = null;

    if(typeof (value) !== "string") {
      pct = 100 * value;

      // eslint-disable-next-line no-constant-condition
      if((pct: number) => 0 && pct <= 30) {
        color = "red";
      }
      if(pct > 30 && pct <= 60) {
        color = "yellow";
      }
      if(pct > 60 && pct <= 100) {
        color = "green";
      }
    } else {
      color = value;
    }

    switch (color) {
      case "red":
        shape = "triangle";
        break;
      case "green":
        shape = "round";
        break;
      case "yellow":
        shape = "square";
        break;
    }

    return <span style={shape !== "triangle" ? { background: theme.palette[color].main } : { borderBottomColor: theme.palette[color].main }} className={classes[shape]}></span>;
  }

  function createProgressBar(data) {
    return (
      <Grid xs={6} item>
        <div>
          <div className="headerData">
            <Typography sx={{ fontFamily: "Poppins" }} component="p" className="item" color={theme.palette.black} variant="subtitle1"> {setShape(data.score)} <span className={"headerData__title capitalizeFirstLetter"}>{data.id}</span></Typography>
            <Typography className="item" color={getBackgroundTag((data.score * 100), theme, true)} variant="subtitle1">{`${data.score * 100}%`}</Typography>
          </div>
          <div style={{ paddingLeft: 20, boxSizing: "border-box" }}>
            <Typography sx={{ marginTop: "10px" }} component="p" className="item" color={getBackgroundTag(data.score * 100, theme, true)} variant="h2">{`${data.displayValue}`}</Typography>
            {detailsView && <Box className={classes.progressBars} >
              {data.ranges.reverse().map((range, index) => <div key={range.id} className={classes.progressBar} style={{ width: `${33.33}%`, background: theme.palette[range.color].main, height: 5 }}>
                <Typography color={theme.palette.grey.dark} variant="caption" component="p" >{range.start}</Typography>
                { index === 0 && <Typography color={theme.palette.grey.dark} variant="caption" component="p" >{`> ${range.start}`}</Typography>}
              </div>)}
              <span style={{ right: `${100 - (data.score * 100)}%` }} className={classes.cursor}></span>
            </Box>}
          </div>
        </div>
      </Grid>
    );
  }

  function handleTogglePageSpeed() {
    setDetailsView(!detailsView);
  }

  return <section className={classes.section}>
    <Typography color={theme.palette.grey.middle1} variant="h2">PAGE SPEED</Typography>
    {<div className={classes.container}>
      {!IsFetching ? <>
        <div className={classes.graph}>
          <div className="container">
            <PieChartSpeed value={newData[isMobile ? "mobile" : "desktop"].performance.score} />
            <Link target="_blank" href={newData.pageURL} variant="subtitle1" className={"link"} >{newData.pageURL}</Link>
            <div className={classes.legends}>
              {newData.desktop.performance.ranges.map((range, index) =>
                <Typography key={index} className="item" color={theme.palette.black} variant="subtitle2">{setShape(range.color)} {`${range.start}-${range.end}`}</Typography>)}
            </div>
            <div style={{ marginTop: "44px" }} className={classes.copyright}>
              <Lightouse />
              <Typography variant="subtitle2">To run a full Lighthouse report, go <Link sx={{ fontWeight: "bold" }} target={"_blank"} href={newData[isMobile ? "mobile" : "desktop"].reportURL} variant="subtitle1" underline="always">here</Link></Typography>
            </div>
          </div>
        </div>
        <div className={classes.data}>
          <div className="container">
            <div className="toogle">
              <PhoneAndroidIcon sx={{ color: isMobile ? theme.palette.blue.main : theme.palette.grey.middle2, borderBottom: isMobile && `2px solid ${theme.palette.blue.main}` }} onClick={() => onToggleDevice(false)} />
              <DesktopWindowsIcon sx={{ color: !isMobile ? theme.palette.blue.main : theme.palette.grey.middle2, borderBottom: !isMobile && `2px solid ${theme.palette.blue.main}` }} onClick={() => onToggleDevice(true)} />
            </div>
            <Typography sx={{ marginTop: "22px", fontWeight: "bold" }} color={theme.palette.black} variant="subtitle1">{`Page last scanned ${formatDistanceToNow(new Date(newData.lastScanned), { addSuffix: true })}`}</Typography>
            <Typography sx={{ marginTop: "12px" }} color={theme.palette.black} variant="h2">Analyse performance issues</Typography>
            <Typography color={theme.palette.grey.dark} variant="subtitle2">See a detailed analysis based on the loading of your site in a simulated environment.</Typography>
            <Button onClick={handleTogglePageSpeed} variant="text" sx={{ justifyContent: "flex-start", borderBottom: `1px solid ${theme.palette.grey.middle1}`, borderRadius: 0, padding: "0 0 5px 0", marginTop: "30px", color: theme.palette.grey.dark, textTransform: "capitalize" }}> {detailsView ? "Collapse view" : "Expand view"} </Button>

            <Grid container rowSpacing={2} columnSpacing={3} >{newData[isMobile ? "mobile" : "desktop"].audits.map(dataProgressBar => createProgressBar(dataProgressBar))}</Grid>
          </div>
        </div>
      </> : <Skeleton width={"100%"} height={300} variant="rectangular" />
      }
    </div>
    }
  </section>;
};