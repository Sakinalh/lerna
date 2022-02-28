import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Logo from "src/assets/img/logo.svg";
import { AppText } from "../../../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: ".8em",
    display: "flex",
    width: "100%",
    alignItems: "center"
  },
  text: {
    paddingLeft: 7
  },
  img: {
    height: 20,
    width: 20,
    borderRadius: "50%",
    backgroundColor: theme.palette.grey.light

  },
  hide: {
    opacity: 0
  }
}));

interface DatumWithUser extends Object {
    author_username: string
    author_photo: string

}

interface ListCellUserProps<T> {
    datum: T
}

export function ListCellUser<T extends DatumWithUser>(props: ListCellUserProps<T>) {
  const { datum } = props;
  const classes = useStyles({});

  return (
    <article
      className={classes.root}
    >
      <img className={classes.img}
        alt=""
        src={datum.author_photo ? datum.author_photo : Logo}/>
      <AppText themeColor="initial"
        text={datum.author_username} props={{ classes: { root: classes.text } }}/>

    </article>
  );
}
