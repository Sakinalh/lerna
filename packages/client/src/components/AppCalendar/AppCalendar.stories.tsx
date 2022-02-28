import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppCalendar } from "./AppCalendar.component";

export default {
  title: "Ui/AppCalendar",
  component: AppCalendar,
  argTypes: {
  }

} as Meta;

const Template: Story= args => <AppCalendar {...args} />;

export const Simple = Template.bind({});
Simple.args = {

};
