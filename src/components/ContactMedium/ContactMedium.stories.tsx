import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ContactMedium from './ContactMedium';
import { IContactMedium } from './types';

const meta: Meta<IContactMedium> = {
  title: 'Components/Charts/Contact Medium Chart',
  component: ContactMedium,
  argTypes: {
    data: {
      description: 'Array representing the number of contacts via each medium.',
      control: { type: undefined },
      defaultValue: [20, 30], // Default values
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[20, 30]' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'This component displays a doughnut chart to show the distribution of contact mediums such as chat and call. It can be customized with any number of sections and colors.',
      },
    },
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;

const Template: StoryFn<IContactMedium> = (args) => <ContactMedium {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [20, 30],
};

export const MoreOptions = Template.bind({});
MoreOptions.args = {
  data: [15, 25, 10],
};

export const LargeNumbers = Template.bind({});
LargeNumbers.args = {
  data: [200, 300],
};

export const SmallNumbers = Template.bind({});
SmallNumbers.args = {
  data: [2, 3],
};
