import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import MonthDefault, { Month, MonthProps} from "./Month";

import { MARKERS } from "../index";

export default {
  title: "Ui/Month",
  component: MonthDefault,
  argTypes: {
  }
} as Meta;

const Template: Story<MonthProps> = args => <MonthDefault {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  value: new Date(),
  dateRange: {
    startDate: new Date(-1),
    endDate: new Date(300)
  },
  minDate: new Date(),
  maxDate: new Date(300),
  navState: [true, true],
  marker: MARKERS.FIRST_MONTH,
  helpers: {
    inHoverRange: (day: Date) => true
  }
};
