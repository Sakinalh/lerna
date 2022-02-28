import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppTag, AppTagProps } from "./AppTag.component";

export default {
  title: "Ui/AppTag",
  component: AppTag,
  argTypes: {
  }
} as Meta;

const Template: Story<AppTagProps> = args => <AppTag {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  children: "test"
};
