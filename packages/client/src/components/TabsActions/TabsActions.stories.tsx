import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { TabsActionsProps, TabsActions } from "./TabsActions.component";
export default {
  title: "Ui/TabsActions",
  component: TabsActions
} as Meta;

const LIST = [
  {
    value: "0",
    viewValue: "content"
  },
  {
    value: "1",
    viewValue: "design"
  }
];

const Template: Story<TabsActionsProps> = args => <TabsActions {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  defaultValue: "content",
  values: LIST,
  onValueChange: () => {},
  value: "0"
};
