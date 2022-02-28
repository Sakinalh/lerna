import { Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ThanksHands } from "src/assets/img/thanksHands.svg";
import { SignUpSucessStyle } from "./SignUpSucess.style";

interface SignUpSucessProps {

}

export function SignUpSucess(props: SignUpSucessProps): JSX.Element {
  const navigate = useNavigate();
  const classes = SignUpSucessStyle(props);

  const handleSucess = () => {
    navigate("/login");
  };

  return (
    <>
      <ThanksHands/>

      <div className={classes.txts}>
        <Typography sx={{marginBottom: "20px"}} variant="h1">
          Thank you for your registration!
        </Typography>

        <Typography variant="subtitle2">
          A person will validate your application.
        </Typography>

        <Typography variant="subtitle1">
          You will receive an email very soon.</Typography>

      </div>

      <Button onClick={handleSucess} variant="contained">Log in</Button>

    </>
  );
}
