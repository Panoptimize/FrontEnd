import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import SatisfactionChart from './SatisfactionChart';
import { ISatisfactionChart } from './types';

const meta: Meta<ISatisfactionChart> = {
  title: 'Components/Charts/Satisfaction Chart',
  component: SatisfactionChart,
  argTypes: {
    data: {
      description: 'Array of satisfaction data points.',
      control: { type: 'object' },
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[70, 15, 9, 5, 1]' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Displays customer satisfaction levels using a doughnut chart. This component is useful for visualizing different levels of customer feedback, from very satisfied to very unsatisfied.',
      },
    },
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;

const Template: StoryFn<ISatisfactionChart> = (args) => <SatisfactionChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [70, 15, 9, 5, 1],
};

export const CustomData = Template.bind({});
CustomData.args = {
  data: [50, 20, 15, 10, 5],
};

export const HighSatisfaction = Template.bind({});
HighSatisfaction.args = {
  data: [90, 5, 3, 1, 1],
};

export const LowSatisfaction = Template.bind({});
LowSatisfaction.args = {
  data: [5, 5, 10, 30, 50],
};
