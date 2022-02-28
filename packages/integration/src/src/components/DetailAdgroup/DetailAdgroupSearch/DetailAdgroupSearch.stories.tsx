import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  DetailAdgroupSearchProps,
  DetailAdgroupSearch
} from "./DetailAdgroupSearch.component";

export default {
  title: "Ui/DetailAdgroupSearch",
  component: DetailAdgroupSearch,
  argTypes: {}
} as Meta;

const Template: Story<DetailAdgroupSearchProps> = args => (
  <DetailAdgroupSearch {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  selection: [{adgroup_id: "test", adgroup_name: "tests" }],
  onSelect: () => {}

};
