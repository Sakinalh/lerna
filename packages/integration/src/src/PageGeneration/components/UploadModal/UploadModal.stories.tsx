import React from "react";
import { Story, Meta } from "@storybook/react";
import { UploadModal, UploadModalProps } from "./UploadModal.component";

export default {
  title: "Ui/UploadModal",
  component: UploadModal,
  argTypes: {}
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<UploadModalProps> = args => <UploadModal {...args} />;

export const simple = Template.bind({});
simple.args = {};
