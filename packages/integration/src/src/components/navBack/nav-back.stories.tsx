import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { Navback, NavBackProps } from "./nav-back.component";
export default {
  title: "Ui/Navback",
  component: Navback

} as Meta;

const props = {

};

const Template: Story<NavBackProps> = args => <Navback {...props} />;

export const Simple = Template.bind({});
Simple.args = {...props};
