import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { InputInputProps, InputHint } from "./InputHint.component";
export default {
  title: "Ui/InputHint",
  component: InputHint

} as Meta;

const props = {
  display: true,
  hint: null,
  inputKey: "13"
};

const Template: Story<InputInputProps> = args => <InputHint {...props} />;

export const Simple = Template.bind({});
Simple.args = {...props};
