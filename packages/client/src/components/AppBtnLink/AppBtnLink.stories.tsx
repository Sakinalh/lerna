import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppBtnLink, AppBtnLinkProps } from "./AppBtnLink.component";

export default {
  title: "Ui/AppBtnLink",
  component: AppBtnLink,
  argTypes: {
  }
} as Meta;

const Template: Story<AppBtnLinkProps> = args => <AppBtnLink {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  uri: "google.com",
  label: "google"
};
