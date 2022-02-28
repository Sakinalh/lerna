import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppLoadStateBtn, AppLoadStateBtnProps } from "./AppLoadStateBtn.component";

export default {
  title: "Ui/AppLoadStateBtn",
  component: AppLoadStateBtn,
  argTypes: {
  }
} as Meta;

const Template: Story<AppLoadStateBtnProps> = args => <AppLoadStateBtn {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  dataState: "idle",
  onClick: (e) => { e.prevendDefault(); },
  defaultLabel: "load more"
};
