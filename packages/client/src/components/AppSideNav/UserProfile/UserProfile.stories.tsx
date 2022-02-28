import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { UserProfile, UserProfileProps } from "./UserProfile.component";

export default {
  title: "Ui/UserProfile",
  component: UserProfile,
  argTypes: {}
} as Meta;

const Template: Story<UserProfileProps> = args => <UserProfile {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  isExpanded: true
};
