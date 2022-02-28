import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppBtn, AppBtnProps } from "./AppBtn.component";

export default {
  title: "Ui/AppBtn",
  component: AppBtn,
  argTypes: {
  }

} as Meta;

const Template: Story<AppBtnProps> = args => <AppBtn {...args} />;

export const Simple = Template.bind({});
Simple.args = {

  typeBtn: "primary",
  arrow: false,
  disabled: false,
  noPadding: false,
  fluid: false,
  customclass: "my_class",
  children: "test"

};
