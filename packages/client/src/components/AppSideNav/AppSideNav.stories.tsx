import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppSideNav, AppSideNavProps } from "./AppSideNav.components";

export default {
  title: "Ui/AppSideNav",
  component: AppSideNav,
  argTypes: {
  }
} as Meta;

const Template: Story<AppSideNavProps> = args => <AppSideNav {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
