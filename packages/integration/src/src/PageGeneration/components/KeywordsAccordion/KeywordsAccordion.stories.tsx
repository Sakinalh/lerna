import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  KeywordsAccordion,
  KeywordsAccordionProps
} from "./KeywordsAccordion.component";

export default {
  title: "Ui/KeywordsAccordion",
  component: KeywordsAccordion,
  argTypes: {}
} as Meta;

const Template: Story<KeywordsAccordionProps> = args => (
  <KeywordsAccordion {...args} />
);

export const Simple = Template.bind({});
Simple.args = {};
