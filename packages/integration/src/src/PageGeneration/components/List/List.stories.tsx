import React from "react";
import { Story, Meta } from "@storybook/react";
import { List, ListProps } from "./List.component";

export default {
  title: "Ui/List",
  component: List,
  argTypes: {

  }
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ListProps> = args => <List {...args} />;

export const simple = Template.bind({});
simple.args = {

};
