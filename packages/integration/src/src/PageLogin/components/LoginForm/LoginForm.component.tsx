import { IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, Divider, Box, Link } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { login } from "src/shared/translation/en.json";
import { AppLink } from "src/components/AppLink/AppLink";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppBtnNext } from "src/components";
import { useDispatch } from "react-redux";
import { setAppUserAction, setUserDetailAction } from "src/redux/store/app";
import { SUCCESS_LOGIN_PATH } from "src/PageLogin/hooks/useTryLogin";
import clsx from "clsx";
import { loginFormStyle } from "./LoginForm.styles";
import { AppText } from "../../../components/AppText/AppText.component";
import { FormHint } from "../FormHint/FormHint.component";

const schema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().required()
});

interface LoginFormProps {
    tryAuth: Function;
}

export function LoginForm(props: LoginFormProps): JSX.Element {
  const { tryAuth } = props;
  const classes = loginFormStyle(props);
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // TODO:: use when cognito ready
  const navigate = useNavigate();

  const onSubmit = ({username, password}) => {
    setIsLoading(true);
    // TODO:: use when cognito ready
    Auth.signIn(username, password).then((user) => {
      dispatch(setUserDetailAction(username));
      dispatch(setAppUserAction({
        access_token: user.signInUserSession.accessToken.jwtToken,
        expires: user.signInUserSession.accessToken.payload.exp,
        username: username,
        access_token_type: "Bearer",
        user_id: 50
      }));

      setIsLoading(false);
      navigate("/businesses/");
    }).catch((e) => {
      setSignInError(e);
      // eslint-disable-next-line
      console.log('e', e);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <section className={classes.root}>
      <header className={classes.heading}>
        <Typography variant="h1">{login.title}</Typography>
        <Typography sx={{fontWeight: 400}} variant="h2">{login.description}</Typography>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} id="login-form-" data-testid="login-form" name="signin">
        <section>
          <TextField
            placeholder="email"
            error={errors?.username?.message && true}
            helperText={errors?.username?.message}
            onKeyDown={() => setSignInError(null)}
            InputLabelProps={{ shrink: true }}
            className={clsx(classes.textFields)}
            variant="outlined"
            name="username"
            {...register("username")} />
          <TextField
              placeholder="password"
              onKeyDown={() => setSignInError(null)}
              InputLabelProps={{ shrink: true }}
              className={clsx(classes.textFields)}
              id="outlined-adornment-password"
              {...register("password")}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              error={errors?.password?.message && true}
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    edge="end"
                    color="primary"
                    size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}/>

          <Link className={classes.reset} variant="subtitle1" href="/password/reset/">Forgot password or email?</Link>

          <Box >
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
              <AppBtnNext type="submit" disabled={isLoading} label="Next"/>
            </Box>
            <FormHint id="form-hint" className={classes.hint} data-testid="message" isShowError={signInError}>
              <p className={classes.error}>{signInError?.message && "Couldn t signin"}</p>
            </FormHint>
          </Box>
        </section>
        <footer className={classes.footer}>
          <Divider sx={{marginBottom: "35px"}} variant="fullWidth" />
          <Typography variant="subtitle2" >Not a member ?&nbsp;<Link variant="subtitle1" href="/signUp/">Sign up</Link></Typography>
        </footer>
      </form>
    </section>
  );
}
