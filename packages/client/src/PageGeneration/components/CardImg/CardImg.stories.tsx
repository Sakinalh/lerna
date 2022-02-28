import React from "react";
import { Story, Meta } from "@storybook/react";
import { Grid, Radio } from "@mui/material";
import { ReactComponent as Delete } from "src/styles/global/icons/delete.svg";
import { ReactComponent as Edit } from "src/styles/global/icons/edit.svg";
import { ReactComponent as Replace } from "src/styles/global/icons/replace.svg";
import { AppCheckbox } from "../../../components/AppCheckbox/AppCheckbox.component";
import { CardImg, CardImgProps } from "./CardImg.component";

export default {
  title: "Ui/CardImg",
  component: CardImg,
  argTypes: {
    isSelected: {},
    header: {},
    content: {},
    footer: {},
    tag: {},
    pct: {},
    src: {},
    actions: {},
    children: {}
  }
} as Meta;

const Template: Story<CardImgProps> = args => <CardImg {...args} />;

export const simple = Template.bind({});
simple.args = {
  isSelected: false,
  header: true,
  content: true,
  footer: true,
  tag: true,
  pct: 98,
  src: "https://via.placeholder.com/250x142",
  actions: null,
  children: null
};

export const addProductCard = Template.bind({});
addProductCard.args = {
  isSelected: true,
  header: true,
  content: true,
  footer: true,
  tag: true,
  pct: 99,
  src: "https://via.placeholder.com/250x142",
  actions: (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <AppCheckbox
          noPadding
          whiteBg
          isSmall
          color="primary"
          disableRipple={true}
        />
      </Grid>
    </Grid>
  ),
  children: (
    <>
      <h4 className="cardImg__title">Le Château de la Belle au Bois Dormant</h4>
      <p className="cardImg__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas orci
        dui…
      </p>
      <p className="cardImg__price">€89</p>
    </>
  )
};

export const addProductCardRadio = Template.bind({});
addProductCardRadio.args = {
  isSelected: true,
  header: true,
  content: true,
  footer: true,
  tag: true,
  pct: 99,
  src: "https://via.placeholder.com/250x142",
  actions: (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Radio
          disableRipple={true}
          focusRipple={true}
          classes={{
            root: "radio radio--root radio--PageCardPreview"
          }}
        />
      </Grid>
    </Grid>
  ),
  children: (
    <>
      <h4 className="cardImg__title">Le Château de la Belle au Bois Dormant</h4>
      <p className="cardImg__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas orci
        dui…
      </p>
      <p className="cardImg__price">€89</p>
    </>
  )
};

export const addProductCardIcons = Template.bind({});
addProductCardIcons.args = {
  isSelected: true,
  header: true,
  content: true,
  footer: true,
  tag: true,
  pct: 99,
  src: "https://via.placeholder.com/250x142",
  actions: (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <AppCheckbox
          noPadding
          whiteBg
          color="primary"
          disableRipple={true}
          classes={{
            root: "checkbox--root checkbox--small checkbox--noPadding ",
            checked: "checkbox--focused checkbox--noPadding",
            disabled: "checkbox--disabled checkbox--noPadding"
          }}
        />
      </Grid>
      <Grid className="cardImg__icons" item>
        <Replace />
        <Edit />
        <Delete />
      </Grid>
    </Grid>
  ),
  children: (
    <>
      <h4 className="cardImg__title">Le Château de la Belle au Bois Dormant</h4>
      <p className="cardImg__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas orci
        dui…
      </p>
      <p className="cardImg__price">€89</p>
    </>
  )
};

export const addProductCardRadioDelete = Template.bind({});
addProductCardRadioDelete.args = {
  isSelected: true,
  header: true,
  content: true,
  footer: true,
  tag: true,
  pct: 99,
  src: "https://via.placeholder.com/250x142",
  actions: (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Radio
          disableRipple={true}
          focusRipple={true}
          classes={{
            root: "radio radio--root radio--PageCardPreview"
          }}
        />
      </Grid>
      <Grid className="cardImg__icons" item>
        <Delete />
      </Grid>
    </Grid>
  ),
  children: (
    <>
      <h4 className="cardImg__title">Le Château de la Belle au Bois Dormant</h4>
      <p className="cardImg__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas orci
        dui…
      </p>
      <p className="cardImg__price">€89</p>
    </>
  )
};

export const addProductCardEmptyFooter = Template.bind({});
addProductCardEmptyFooter.args = {
  isSelected: true,
  header: true,
  content: true,
  footer: true,
  tag: true,
  pct: 99,
  src: "https://via.placeholder.com/250x142",
  children: (
    <>
      <h4 className="cardImg__title">Le Château de la Belle au Bois Dormant</h4>
      <p className="cardImg__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas orci
        dui…
      </p>
      <p className="cardImg__price">€89</p>
    </>
  )
};
