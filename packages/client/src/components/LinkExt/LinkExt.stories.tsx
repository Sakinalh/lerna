import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { LinkExt, LinkExtProps } from "./LinkExt.component";
export default {
  title: "Ui/LinkExt",
  component: LinkExt

} as Meta;

const props = {
  link: "https://www.google.com/",
  label: "google",
  custom: "myclass"
};

const Template: Story<LinkExtProps> = args => <LinkExt {...props} />;

export const Simple = Template.bind({});
Simple.args = {...props};
