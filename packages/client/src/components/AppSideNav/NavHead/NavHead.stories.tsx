import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { NavHead, NavHeadProps } from "./NavHead.component";

export default {
  title: "Ui/NavHead",
  component: NavHead,
  argTypes: {
  }
} as Meta;

const Template: Story<NavHeadProps> = args => <NavHead {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  isExpanded: true
};
