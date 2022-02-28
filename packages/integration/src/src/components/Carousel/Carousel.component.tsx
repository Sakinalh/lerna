import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "src/deps";
import clsx from "clsx";

const useStyles = makeStyles({
  parent: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "30px auto 30px",
    alignItems: "center"
  },
  container: {
    position: "relative",
    overflow: "hidden",
    maxWidth: "100%",
    zIndex: 1
  },
  inner: {
    overflow: "hidden"
  },
  item: {

    width: "100%",
    padding: 5,
    position: "absolute",
    top: 0,
    transition: "transform .5s, opacity .2s, z-index .5s",
    opacity: 0
  },
  btn: {
    height: 40
  },
  active: {
    opacity: 1,
    position: "relative",
    zIndex: 90
  },
  next: {
    transform: "translateX(100%)",
    zIndex: 80
  },
  prev: {
    transform: "translateX(-100%)",
    zIndex: 80
  }

});

interface SliderState {
    current: number;
    next: number;
    prev: number;
}

export interface CarouselProps {
    children: React.ReactNode[]
    width?: number,
    unit?: string
}

export function Carousel({ children, width = 100, unit = "%" }: CarouselProps) {
  const classes = useStyles({});
  const listLimit = children.length - 1;
  const [slide, setSlide] = useState<SliderState>({ current: 0, next: 1, prev: listLimit });

  function setClassesName(idx, state) {
    if(idx === state.current) {
      return classes.active;
    }
    if(idx === state.next) {
      return classes.next;
    }
    if(idx === state.prev) {
      return classes.prev;
    }

    return null;
  }

  function nav(listLimit: number) {
    return (slide, dir: "next" | "prev") => {
      const to = dir === "next" ? slide.next : slide.prev;
      const currentPosition: number = slide.current;

      if(to === 0) {
        setSlide({ current: 0, next: 1, prev: listLimit });
        return;
      }

      if(dir === "next") {
        const nextState = to === listLimit
          ? {
            current: listLimit,
            next: 0,
            prev: listLimit - 1
          }
          : { current: currentPosition + 1, next: currentPosition + 2, prev: currentPosition };
        setSlide(nextState);
        return;
      }
      const nextState = to === listLimit
        ? { current: listLimit, next: 0, prev: 1 }
        : {
          current: currentPosition - 1,
          next: currentPosition,
          prev: currentPosition - 2
        };

      setSlide(nextState);
    };
  }

  const partNav = nav(listLimit);
  return (
    <div
      className={classes.parent}
      style={{
        width: `${width}${unit}`
      }}
    >
      <IconButton
        classes={{ root: classes.btn }}
        onClick={_e => partNav(slide, "prev")}
        size="large">
        <ArrowBackIos/>
      </IconButton>

      <div className={classes.container}>
        <ul className={classes.inner}>
          {
            children.map((item, idx) => (
              <li key={`__carousel_${idx}`}
                className={clsx(classes.item, setClassesName(idx, slide))}

              >
                {item}
              </li>
            ))
          }
        </ul>
      </div>

      <IconButton
        onClick={_e => partNav(slide, "next")}
        classes={{ root: classes.btn }}
        size="large">
        <ArrowForwardIos/>
      </IconButton>
    </div>
  );
}
