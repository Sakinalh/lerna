import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { ProjectsHeadProps, ProjectsHead } from "./ProjectsHead.component";
export default {
  title: "Ui/ProjectsHead",
  component: ProjectsHead
} as Meta;

const props = {
  customclass: "myClass"
};

const Template: Story<ProjectsHeadProps> = args => (
  <ProjectsHead {...props} />
);

export const Simple = Template.bind({});
Simple.args = { ...props };
