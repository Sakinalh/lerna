import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  DetailAdgroupProps,
  DetailAdgroup
} from "./DetailAdgroup.component";

export default {
  title: "Ui/DetailAdgroup",
  component: DetailAdgroup,
  argTypes: {}
} as Meta;

const Template: Story<DetailAdgroupProps> = args => (
  <DetailAdgroup {...args} />
);

export const Simple = Template.bind({});

Simple.args = {

};
