import React from "react";
import { Story, Meta } from "@storybook/react";
import { LinkToAdwordsModal, LinkToAdwordsModalProps } from "./LinkToAdwordsModal.component";

export default {
  title: "Ui/linkToAdwordsModal",
  component: LinkToAdwordsModal,
  argTypes: {}
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<LinkToAdwordsModalProps> = args => <LinkToAdwordsModal {...args} />;

export const simple = Template.bind({});
simple.args = {};
