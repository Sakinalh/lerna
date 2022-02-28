import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { BtnMenu, BtnMenuProps, MenuItemInterface } from "./BtnMenu";

export default {
  title: "Ui/BtnMenu",
  component: BtnMenu,
  argTypes: {
    menuItems: {
      required: true,
      description: "Items displayed in the menu"
    },
    onSelectItem: {
      required: true,
      description: "Function called on select item"
    }
  }
} as Meta;

const Template: Story<BtnMenuProps> = args => <BtnMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onSelectItem: () => console.log("clicked"),
  menuItems: [{ name: "item1", value: "clicks" }, { name: "item2", value: "conversion" }]
};

export const Secondary = Template.bind({});
Secondary.args = {
  onSelectItem: () => console.log("clicked"),
  menuItems: [{ name: "item1", value: "item1" }, { name: "item2", value: "item2" }]
};

export const Large = Template.bind({});
Large.args = {
  onSelectItem: () => console.log("clicked"),
  menuItems: [{ name: "item1", value: "item1" }, { name: "item2", value: "item2" }]
};

export const Small = Template.bind({});
Small.args = {
  onSelectItem: () => console.log("clicked"),
  menuItems: [{ name: "item1", value: "item1" }, { name: "item2", value: "item2" }]
};
