import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppBarAvatar, AppBarAvatarProps } from "./AppBarAvatar";

export default {
  title: "Ui/AppBarAvatar",
  component: AppBarAvatar,
  argTypes: {
  }
} as Meta;

const Template: Story<AppBarAvatarProps> = args => <AppBarAvatar {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
