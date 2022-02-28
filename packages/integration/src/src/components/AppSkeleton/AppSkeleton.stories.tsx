import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppSkeletonProps, AppSkeleton } from "./AppSkeleton.component";

export default {
  title: "Ui/AppSkeleton",
  component: AppSkeleton,
  argTypes: {}
} as Meta;

const Template: Story<AppSkeletonProps> = args => <AppSkeleton {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  isScale: true,
  type: "PAGINATED_QUEUE_TITLE_CAT",
  width: "100%",
  height: 50
};
