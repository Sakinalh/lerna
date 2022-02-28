import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { ConfirmDialog, ConfirmDialogProps } from "./ConfirmDialog.component";

export default {
  title: "Ui/ConfirmDialog",
  component: ConfirmDialog

} as Meta;

const Template: Story<ConfirmDialogProps> = args => <ConfirmDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  handleClose: () => false,
  handleConfirm: () => console.log("Confirm"),
  open: true,
  title: "Simple Confirm modal",
  textContent: "You are seing simple confimr modal, feel free to use it",
  confirmLabel: "Ok"
};
