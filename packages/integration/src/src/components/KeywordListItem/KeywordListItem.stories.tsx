import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { KeywordListItem, KeywordListItemProps } from "./KeywordListItem.component";

export default {
  title: "Ui/KeywordListItem",
  component: KeywordListItem,
  argTypes: {
  }
} as Meta;

const Template: Story<KeywordListItemProps> = args => <KeywordListItem {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
