import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppBtnNext, AppBtnProps } from "./AppBtnNext.component";

export default {
  title: "Ui/AppBtnNext",
  component: AppBtnNext
} as Meta;

export const Default = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Default" />;
export const Primary = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Primary Contained" color='primary' variant='contained'/>;
export const PrimaryOutlined = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Primary Outlined" color='primary' variant='outlined' />;
export const Secondary = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Secondary" color='secondary' variant='contained'/>;
export const SecondaryOutlined = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Secondary Outlined" color='secondary' variant='outlined' />;
export const Disabled = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Disabled" disabled={true}/>;
export const DisabledOutlined = () => <AppBtnNext onClick={() => { alert("Clicked"); }} label="Disabled" disabled={true} variant='outlined'/>;