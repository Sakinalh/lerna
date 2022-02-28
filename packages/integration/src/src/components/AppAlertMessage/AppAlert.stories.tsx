import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppAlertMessage, AppAlertMessageProps } from "./AppAlertMessage.component";

export default {
  title: "Ui/AppAlertMessage",
  component: AppAlertMessage,
  argTypes: {
  }
} as Meta;

const Template: Story<AppAlertMessageProps> = args => <AppAlertMessage {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  severity: "success",
  title: "Your pages have been published",
  children: "You have no more items pending. To continue, go to the"
};
