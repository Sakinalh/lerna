import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { IconCircularProgress, IconCircularProgressProps } from "./IconCircularProgress.component";
export default {
  title: "Ui/IconCircularProgress",
  component: IconCircularProgress

} as Meta;

const props = {
  value: 80,
  total: 80
};

const Template: Story<IconCircularProgressProps> = args => <IconCircularProgress {...props} />;

export const Completed = Template.bind({});
Completed.args = {...props};

export const Primary = Template.bind({});
Primary.args = { ...Primary.args, value: 20, total: 80};
