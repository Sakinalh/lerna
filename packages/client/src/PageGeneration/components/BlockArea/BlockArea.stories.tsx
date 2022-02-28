import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { BlockArea, BlockAreaProps } from "./BlockArea.component";

export default {
  title: "Ui/BlockArea",
  component: BlockArea,
  argTypes: {}
} as Meta;

const Template: Story<BlockAreaProps> = args => <BlockArea {...args} />;

export const AreaImg = Template.bind({});
AreaImg.args = {

  area: {
    id: 1,
    type: "image",
    name: "test",
    content: "https://via.placeholder.com/82x53",
    score: 90
  }

};

export const AreaProducts = Template.bind({});
AreaProducts.args = {
  area: {
    id: 1,
    type: "product",
    name: "test",
    content: "test",
    score: 90
  }

};

export const AreaTxt = Template.bind({});
AreaTxt.args = {
  area: {
    id: 1,
    type: "product",
    name: "test",
    content: "test",
    score: 90
  }
};
