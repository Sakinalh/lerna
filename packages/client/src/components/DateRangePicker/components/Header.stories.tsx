import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import HeaderDefault, { HeaderProps, Header} from "./Header";

export default {
  title: "Ui/Header",
  component: HeaderDefault,
  argTypes: {
  }
} as Meta;

const Template: Story<HeaderProps> = args => <HeaderDefault {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  date: new Date()
};
