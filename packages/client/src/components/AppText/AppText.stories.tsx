import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppTextProps, AppText } from "./AppText.component";

export default {
  title: "Ui/AppText",
  component: AppText,
  argTypes: {}
} as Meta;

const Template: Story<AppTextProps> = args => <AppText {...args} />;

export const Simple = Template.bind({});

Simple.args = {

  text: "test",
  capitalize: "none",
  themeColor: "inherit",
  type: "text",
  bold: "none",
  customclass: ""

};
