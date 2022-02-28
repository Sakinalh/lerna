import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router";
import { AppLink, AppNavLink } from "./AppLink";

export default {
  title: "Ui/AppLink",
  component: AppLink,
  argTypes: {
  },
  decorators: [Story => (<MemoryRouter><Story/></MemoryRouter>)] //Wrapping the story inside the router

} as Meta;

const Template: Story<AppNavLink> = args => <AppLink {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  variant: "body1",
  customclass: "",
  rootClass: "",
  label: "test",
  truncate: false,
  iconBefore: null,
  isUnderline: true,
  type: "",
  path: "/"
};
