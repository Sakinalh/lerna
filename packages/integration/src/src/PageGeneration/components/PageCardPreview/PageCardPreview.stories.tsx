import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { PageCardPreview, PageCardPreviewProps } from "./PageCardPreview.component";

export default {
  title: "Ui/PageCardPreview",
  component: PageCardPreview,
  argTypes: {
  }
} as Meta;

const Template: Story<PageCardPreviewProps> = args => <PageCardPreview {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
