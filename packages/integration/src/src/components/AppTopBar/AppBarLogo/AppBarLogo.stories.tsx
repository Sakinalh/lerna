import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppBarLogo, AppBarLogoProps } from "./AppBarLogo.component";

export default {
  title: "Ui/AppBarLogo",
  component: AppBarLogo,
  argTypes: {
  }
} as Meta;

const Template: Story<AppBarLogoProps> = args => <AppBarLogo {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
