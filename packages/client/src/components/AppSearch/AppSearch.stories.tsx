import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppSearch, AppSearchProps } from "./AppSearch.component";

export default {
  title: "Ui/AppSearch",
  component: AppSearch,
  argTypes: {
  }
} as Meta;

const Template: Story<AppSearchProps> = args => <AppSearch {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
