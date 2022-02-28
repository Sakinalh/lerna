import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { PieChart } from "@mui/icons-material";
import { MemoryRouter } from "react-router";
import { AppNavItem, AppNavItemProps } from "./AppNavItem.component";

export default {
  title: "Ui/AppNavItem",
  component: AppNavItem,
  argTypes: {
  },
  decorators: [Story => (<MemoryRouter><Story/></MemoryRouter>)] //Wrapping the story inside the router

} as Meta;

const link =
  {
    fullPath: "/data/analytic/dashboard/",
    label: "Analytics & Optimizations",
    pathId: "data",
    icon: <PieChart/>
  };

const pathname = window.location.pathname;

const Template: Story<AppNavItemProps> = args => <AppNavItem {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  pathName: pathname,
  pathId: link.pathId,
  fullPath: link.fullPath,
  label: link.label,
  icon: link.icon
};
