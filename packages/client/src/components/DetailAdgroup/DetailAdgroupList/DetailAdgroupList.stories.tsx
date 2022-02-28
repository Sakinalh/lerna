import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  DetailAdgroupListProps,
  DetailAdgroupList
} from "./DetailAdgroupList.component";

export default {
  title: "Ui/DetailAdgroupList",
  component: DetailAdgroupList,
  argTypes: {}
} as Meta;

const Template: Story<DetailAdgroupListProps> = args => (
  <DetailAdgroupList {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  selection: [{adgroup_id: "test", adgroup_name: "tests" }],
  onSelect: () => {},
  onSetAll: () => {}
};
