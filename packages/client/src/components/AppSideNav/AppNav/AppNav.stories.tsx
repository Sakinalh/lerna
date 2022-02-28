import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import {MemoryRouter} from "react-router-dom";
import { AppNav, AppNavProps } from "./AppNav.component";

export default {
  title: "Ui/AppNav",
  component: AppNav,
  argTypes: {
  },
  decorators: [Story => (<MemoryRouter><Story/></MemoryRouter>)] //Wrapping the story inside the router

} as Meta;

const Template: Story<AppNavProps> = args => <AppNav {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  isExpanded: true
};