import { IconButton, Button, Typography, TextField, FormControlLabel, Grid, useTheme, Alert } from "@mui/material";
import { AppCheckbox } from "src/components";
import clsx from "clsx";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { SignUpStyle } from "./SignUpForm.styles";
import { SignUpSucess } from "../SignUpSucess/SignUpSucess.component";

interface SignUpFormProps {
}

export function SignUpForm(props: SignUpFormProps): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = SignUpStyle(props);
  const [isAgency, setIsAgency] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    passwordConfirmation: yup.string().required().oneOf([yup.ref("password"), null]).matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    agency_name: isAgency && yup.string().required()
  });
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid, isDirty }, getValues } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onToggleAgency = (value) => {
    setIsAgency(value);
  };

  const handleBack = () => {
    navigate("/login");
  };

  // console.log(errors);

  const onSubmit = (data) => {
    const config = {
      username: data.email,
      password: data.password,
      validationData: {
        agency_name: isAgency ? data.agency_name : null,
        user_status: isAgency ? "DISABLED" : "DISABLED",
        user_type: isAgency ? "admin" : "user"
      }
    };
    Auth.signUp(config)
      .then((user) => {
        console.log("user has been signed up", user);
        setIsSucess(true);
      })
      .catch((error) => {
        setAlertMessage(error.toString());
        setIsSucess(false);
      });
  };

  return (
    <section className={classes.root}>
      {!isSucess && <div className={classes.back}>
        <IconButton
          color="primary"
          onClick={handleBack}
          aria-label="delete"
          sx={{ border: `1px solid ${theme.palette.blue.main}`, borderRadius: "50%", marginRight: "8px", height: 32, width: 32 }}
          size="large">
          <ArrowBackIcon color="primary" fontSize='small' sx={{fontWeight: "700px" }} />

        </IconButton>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Back
        </Typography>
      </div>}

      <div className={clsx(classes.container, isSucess && "isSucess")}>
        {!isSucess ? (
          <>
            <header className={classes.header}>
              <Typography variant="h1">NEW USER</Typography>
              <Typography variant="h2" fontWeight={400} >Creat your account</Typography>
            </header>

            {alertMessage && <Alert severity="error" sx={{marginBottom: "15px"}}>{alertMessage}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>

              <Grid spacing={3} className={classes.fieldset} component={"fieldset"} container>
                <Grid item xs={6} >
                  <TextField type="email" error={!!errors.email && errors.email.ref.value !== ""} helperText={errors.email && errors.email.ref.value !== "" && "this email didn't exist"} {...register("email")} fullWidth placeholder="Email" name="email" />
                </Grid>

              </Grid>

              <Grid spacing={3} className={classes.fieldset} component={"fieldset"} container>
                <Grid item xs={6} >
                  <TextField error={!!errors?.password && errors?.password?.ref?.value !== ""} helperText={errors?.password?.ref?.value !== "" && errors?.password?.message} type="password" {...register("password")} fullWidth placeholder="Password" name="password" />
                </Grid>
                <Grid item xs={6}>
                  <TextField error={!!errors?.passwordConfirmation && errors?.passwordConfirmation?.ref?.value !== ""} helperText={ errors?.passwordConfirmation?.ref?.value !== "" && errors?.passwordConfirmation?.message } type="password" {...register("passwordConfirmation")} fullWidth placeholder="Password confirmation" name="passwordConfirmation" />
                </Grid>
              </Grid>

              <Grid spacing={3} className={classes.fieldset} component={"fieldset"} container>
                <Grid item xs={6}>
                  <TextField error={!!errors.first_name && errors.first_name.ref.value !== "" } helperText={errors?.first_name && errors.first_name.ref.value !== "" && "first name is required"} {...register("first_name")} fullWidth placeholder="First name" name="first_name" />
                </Grid>
                <Grid item xs={6}>
                  <TextField error={!!errors.last_name && errors.last_name.ref.value !== "" } helperText={errors?.last_name && errors.last_name.ref.value !== "" && "last name is required"} {...register("last_name")} fullWidth placeholder="Last name" name="last_name" />
                </Grid>
              </Grid>
              <fieldset className={clsx(classes.fieldset, "noMargin")}>
                <FormControlLabel
                  control={
                    <AppCheckbox
                      whiteBg
                      checked={isAgency}
                      onChange={() => onToggleAgency(!isAgency)}
                      name={"agency"}
                    />
                  }
                  label={<Typography variant="subtitle2">I am an agency</Typography>}
                />
              </fieldset>

              {isAgency && <fieldset className={classes.fieldset}>
                <TextField error={!!errors.agency_name && errors.agency_name.ref.value !== ""} helperText={errors.agency_name && errors.agency_name.ref.value !== "" && "agency name is required"} {...register("agency_name")} fullWidth placeholder="Name of the agency" name="agency_name" />
              </fieldset>}
              <fieldset style={{ display: "flex", justifyContent: "flex-end", width: "100%" }} className={classes.fieldset}>
                <Button disabled={!isValid || !isDirty} type="submit" variant="contained">
                  Creat
                </Button>
              </fieldset>

            </form>
          </>) : <SignUpSucess />

        }

      </div>

    </section>
  );
}