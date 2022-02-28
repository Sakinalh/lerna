import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { TabPanel, TabPanelProps } from "./TabPanel.component";

export default {
  title: "Ui/TabPanel",
  component: TabPanel,
  argTypes: {
  }
} as Meta;

const Template: Story<TabPanelProps> = args => <TabPanel {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  value: "test",
  index: "1",
  children: (<p>test</p>)
};
