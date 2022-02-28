import React from "react";
import { Story, Meta } from "@storybook/react";
import { FiltersProductNav, FiltersProductNavProps } from "./FiltersProductNav.component";

export default {
  title: "Ui/FiltersProductNav",
  component: FiltersProductNav,
  argTypes: {

  }
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<FiltersProductNavProps> = args => <FiltersProductNav {...args} />;

export const simple = Template.bind({});
simple.args = {

};
