import React from "react";
import { Story, Meta } from "@storybook/react";
import { AppPagination, AppPaginationProps } from "./AppPagination.component";

export default {
  title: "Ui/AppPagination",
  component: AppPagination,
  argTypes: {}
} as Meta;

const Template: Story<AppPaginationProps> = args => (
  <AppPagination {...args} />
);

export const simple = Template.bind({});
simple.args = {};
