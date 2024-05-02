import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import ProgressBar from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: 'number',
    },
    value: {
      control: 'number',
    },
    type: {
      control: {
        type: 'select',
        options: ['temperature', 'time'],
      },
    },
    connected: {
      control: 'boolean',
    },
  },
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  max: 100,
  value: 50,
  type: 'temperature', 
  connected: true, 
};
