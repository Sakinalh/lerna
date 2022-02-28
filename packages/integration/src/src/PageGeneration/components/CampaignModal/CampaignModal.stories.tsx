import React from "react";
import { Story, Meta } from "@storybook/react";
import { CampaignModal, CampaignModalProps } from "./CampaignModal.component";

export default {
  title: "Ui/campaignModal",
  component: CampaignModal,
  argTypes: {}
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<CampaignModalProps> = args => <CampaignModal {...args} />;

export const simple = Template.bind({});
simple.args = {};
