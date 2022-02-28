import React from "react";
import { Story, Meta } from "@storybook/react";
import { AppTextAreaProps, AppTextArea } from "./AppTextArea.component";

export default {
  title: "Ui/AppTextArea",
  component: AppTextArea,
  argTypes: {}
} as Meta;

const Template: Story<AppTextAreaProps> = args => (
  <AppTextArea {...args} />
);

export const simple = Template.bind({});
simple.args = {};
