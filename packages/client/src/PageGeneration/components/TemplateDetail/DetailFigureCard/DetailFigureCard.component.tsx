import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px 0",
    border: theme.shape.border.solidGrey
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 15,
    margin: "0 auto"
  },
  title: {
    paddingLeft: 10
  },
  content: {
    color: theme.palette.blue.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: theme.shape.constShape.defaultFontSize,
    padding: "10px 0"
  },
  datum: {
    padding: "0 5px",
    fontWeight: 500
  },
  footer: {
    color: theme.palette.grey.dark,
    fontSize: ".8em",
    display: "flex",
    flexDirection: "column"
  },
  evolution: {
    fontSize: ".8em",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center"
  }
}));

interface DetailFigureCardProps {
    icon: JSX.Element,
    title: string,
    content: string,
    footer?: JSX.Element
}

export function DetailFigureCard(props: DetailFigureCardProps) {
  const { icon, title, content, footer = null } = props;

  const classes = useStyles({});

  return (
    <article className={classes.root}>
      <header className={classes.header}>
        {icon}
        <AppText text={title} props={{ classes: { root: classes.title } }}/>

      </header>
      <div className={classes.content}>
        <AppText text={content} props={{ classes: { root: classes.title } }}/>
      </div>
      <footer className={classes.footer}>
        {footer}
      </footer>
    </article>
  );
}
