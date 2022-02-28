import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { Carousel, CarouselProps } from "./Carousel.component";

export default {
  title: "Ui/Carousel",
  component: Carousel,
  argTypes: {}
} as Meta;

const Template: Story<CarouselProps> = args => <Carousel {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  children: [1, 2, 3]
};
