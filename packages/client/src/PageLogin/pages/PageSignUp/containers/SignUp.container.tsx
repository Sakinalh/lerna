// hooks
import { PageTheme } from "src/containers/PageTheme/PageTheme.container";
import makeStyles from "@mui/styles/makeStyles";
import { SignUpForm } from "../components/SignUpForm/SignUpForm.component";
const FAILED_SIGNIN = "Couldn't signin";
const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    fontSize: 12,
    background: theme.palette.blue.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
}));

interface SignUpProps {}

function SignUp(_props: SignUpProps): JSX.Element {
  const classes = useStyles({});

  return (
    <PageTheme>
      <div className={classes.root}>
        <SignUpForm data-testid="signUp-form" />
      </div>
    </PageTheme>
  );
}

export default SignUp;