import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { PageCardsPreview, PageCardsPreviewProps } from "./PageCardsPreview.container";

export default {
  title: "Ui/PageCardsPreview",
  component: PageCardsPreview,
  argTypes: {
  }
} as Meta;

const Template: Story<PageCardsPreviewProps> = args => <PageCardsPreview {...args} />;

export const Simple = Template.bind({});
Simple.args = {};
