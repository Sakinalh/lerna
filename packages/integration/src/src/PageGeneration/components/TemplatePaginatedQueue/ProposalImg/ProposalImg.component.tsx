import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  }
});

interface ProposalImgProps {
    src: string;
    alt: string;
}

export function ProposalImg({ src, alt }: ProposalImgProps) {
  const classes = useStyles({});
  return (
    <img
      className={classes.img}
      src={src}
      alt={alt}/>

  );
}
