import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppAlert, AppAlertProps } from "../AppAlert/AppAlert.component";

export default {
  title: "Ui/AppAlert",
  component: AppAlert,
  argTypes: {
  }
} as Meta;

const Template: Story<AppAlertProps> = args => <AppAlert {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
