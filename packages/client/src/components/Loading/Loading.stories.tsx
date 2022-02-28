import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { Loading, LoadingProps } from "./Loading.component";
export default {
  title: "Ui/Loading",
  component: Loading
} as Meta;

const props = {};

const Template: Story<LoadingProps> = args => <Loading {...props} />;

export const Simple = Template.bind({});
Simple.args = { ...props };
