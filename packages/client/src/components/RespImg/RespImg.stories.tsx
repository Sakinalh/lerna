import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { ResponsiveImg, ResponsiveImgProps } from "./RespImg.component";
export default {
  title: "Ui/ResponsiveImg",
  component: ResponsiveImg
} as Meta;

const props = {
  maxHeight: 500
};

const Template: Story<ResponsiveImgProps> = args => (
  <ResponsiveImg src={"https://via.placeholder.com/44x44"} {...props} />
);

export const Simple = Template.bind({});
Simple.args = { ...props };
