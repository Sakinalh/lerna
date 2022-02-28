import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { IconPopOver, IconPopOverProps } from "./IconPopover.component";

export default {
  title: "Ui/IconPopOver",
  component: IconPopOver,
  argTypes: {}
} as Meta;

const Template: Story<IconPopOverProps> = args => <IconPopOver {...args} />;

export const Simple = Template.bind({});
Simple.args = {

};
