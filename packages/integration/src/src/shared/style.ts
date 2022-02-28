export const SKELETON = {
  animation: {
    "@keyframes shineLines": {
      from: { backgroundPosition: -100 },
      to: { backgroundPosition: "40vw" }
    }
  },
  applyAnimation: {
    backgroundImage:
            "linear-gradient(90deg, #F4F4F4 0px, rgba(229,229,229,0.8)  40px, #F4F4F4 20%)",
    animationName: "$shineLines",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDuration: "3s",
    animationFillMode: "forwards"
  }
};
