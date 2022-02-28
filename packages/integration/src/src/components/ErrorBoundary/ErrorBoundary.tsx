import * as React from "react";
import withStyles from "@mui/styles/withStyles";
import error from "../../assets/img/404.svg";
const styles = {
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  img: {
    width: "19%"
  },
  title: {
    fontSize: 24,
    color: props => props.theme.palette.blue.main
  },
  content: {
    height: 200,
    padding: "20px 0",
    display: "contents"
  },
  txt: {
    lineHeight: 1.8
  },
  link: {
    paddingTop: 20,
    textAlign: "center",
    width: "100%",
    display: "block"
  }
};

interface ErrorBoundaryProps {
    children: JSX.Element | null;
    classes: any;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps,
    ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    // eslint-disable-next-line
    console.error(error, errorInfo);
  }

  render() {
    if(this.state.hasError) {
      // You can render any custom fallback UI
      const { classes } = this.props;

      return (
        <section className={classes.root}>
          <div className={classes.content}>
            <img
              className={classes.img}
              src={error}
              alt="application has error"
            />
            <h1 className={classes.title}>We're sorry. Something went wrong</h1>
            <p className={classes.txt}>
              An error has occured and we're trying to fix the problem !<br/>
              If the error persist or you need immediate help, please contact us
            </p>
            <a
              className={classes.link}
              href="/project/all"
              data-testid="link_projects"
            >
              Go to the list of project
            </a>
          </div>
        </section>
      );
    }
    return this.props.children ? this.props.children : null;
  }
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(ErrorBoundary);
