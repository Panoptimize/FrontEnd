import {Meta, StoryFn} from '@storybook/react';
import { IErasablePill } from './types';
import ErasablePill from './ErasablePill';
import React from "react";
export default {
  title: 'Components/ErasablePill',
  component: ErasablePill,
} as Meta;

const Template: StoryFn<IErasablePill> = (args) => <ErasablePill {...args} onRemove={() => {}} />; // Provide a dummy onRemove function
export const Default = Template.bind({});
Default.args = {
  selectedOption: { value: "option1", label: "Option 1" },
};
