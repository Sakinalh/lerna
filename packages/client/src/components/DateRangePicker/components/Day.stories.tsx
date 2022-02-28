import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import DayDefault, { DayProps, Day} from "./Day";

export default {
  title: "Ui/Day",
  component: DayDefault,
  argTypes: {
  }
} as Meta;

const Template: Story<DayProps> = args => <DayDefault {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  value: 1
};
