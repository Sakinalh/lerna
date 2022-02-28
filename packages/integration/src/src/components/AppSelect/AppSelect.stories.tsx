import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppSelect, AppSelectProps } from "./AppSelect.component";

export default {
  title: "Ui/AppSelect",
  component: AppSelect,
  argTypes: {
  }
} as Meta;

const Template: Story<AppSelectProps> = args => <AppSelect {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
