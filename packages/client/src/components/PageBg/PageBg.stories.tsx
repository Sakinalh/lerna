import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { PageBg, PageBgProps } from "./PageBg.component";
export default {
  title: "Ui/PageBg",
  component: PageBg

} as Meta;

const props = {
  children: null,
  customclass: "myClass"
};

const Template: Story<PageBgProps> = args => <PageBg {...props} />;

export const Simple = Template.bind({});
Simple.args = {...props};
