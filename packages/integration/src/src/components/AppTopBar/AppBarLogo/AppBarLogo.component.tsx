import * as React from "react";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import Logo from "src/assets/img/logo.svg";
import { ResponsiveImg } from "../../RespImg/RespImg.component";

const BTN_HEIGHT: number = 50;

const useStyles = makeStyles({
  root: (props: any) => ({
    display: "inline-flex",
    "justify-content": "center",
    "align-items": "center",
    height: BTN_HEIGHT,
    ...props.root
  }),
  app__title: (props: any) => ({
    fontSize: "1.8rem",
    padding: "0 1.5rem",
    ...props.app__title
  }),
  logo: {
    padding: "0 10px"
  }
});

export const LogoImgWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export interface AppBarLogoProps {
    root?: Object;
    app__title?: Object;
    altLogo?: boolean;
}

export function AppBarLogo(props: AppBarLogoProps): JSX.Element {
  const classes: any = useStyles(props);

  return (
    <div className={classes.root}>
      <ResponsiveImg className={classes.logo} src={Logo} maxHeight={3}/>
    </div>
  );
}

AppBarLogo.defaultProp = {
  altLogo: false
};
