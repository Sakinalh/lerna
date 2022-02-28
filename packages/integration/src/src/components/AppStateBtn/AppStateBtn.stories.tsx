import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppStateBtnProps, AppStateBtn } from "./AppStateBtn.component";

export default {
  title: "Ui/AppStateBtn",
  component: AppStateBtn,
  argTypes: {}
} as Meta;

const Template: Story<AppStateBtnProps> = args => <AppStateBtn {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  dataState: "loading",
  onAction: () => {},
  children: <>children</>,
  disable: "test"
};
