import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  LabeledIconBtn,
  LabeledIconBtnProps
} from "./LabeledIconBtn.component";
export default {
  title: "Ui/LabeledIconBtn",
  component: LabeledIconBtn
} as Meta;

const props = {
  label: "label",
  percentage: 80,
  idx: 1
};

const Template: Story<LabeledIconBtnProps> = args => (
  <LabeledIconBtn {...props} />
);

export const Simple = Template.bind({});
Simple.args = { ...props };
