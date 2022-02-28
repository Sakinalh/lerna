import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AsideKeywords, AsideKeywordsProps } from "./AsideKeywords.component";

export default {
  title: "Ui/AsideKeywords",
  component: AsideKeywords,
  argTypes: {
  }
} as Meta;

const Template: Story<AsideKeywordsProps> = args => <AsideKeywords {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
