import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppError, AppErrorProps } from "./AppError.component";

export default {
  title: "Ui/AppError",
  component: AppError,
  argTypes: {
  }

} as Meta;

const Template: Story<AppErrorProps> = args => <AppError {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  message: "no data",
  isError: false,
  className: "my_class"
};
