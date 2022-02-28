import React from "react";
import { Story, Meta } from "@storybook/react";
import { EditProductModal, EditProductModalProps } from "./EditProductModal.component";

export default {
  title: "Ui/EditProductModal",
  component: EditProductModal,
  argTypes: {
    onHandleCloseCallback: { },
    openCallback: {}
  }
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<EditProductModalProps> = args => <EditProductModal {...args} />;

export const simple = Template.bind({});

// const [open, setOpen] = React.useState(false);

// const handleClose = () => {
//     setOpen(false);
//   };

simple.args = {
  // onHandleCloseCallback : handleClose,
  // openCallback : open
};
