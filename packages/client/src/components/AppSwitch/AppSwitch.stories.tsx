import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppSwitch, AppSwitchProps } from "./AppSwitch.component";

export default {
  title: "Ui/AppSwitch",
  component: AppSwitch,
  argTypes: {
  }
} as Meta;

const Template: Story<AppSwitchProps> = args => <AppSwitch {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
