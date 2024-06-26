import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import PerformanceChart from './PerformanceChart';
import { IPerformanceChart } from './types';

const meta: Meta<IPerformanceChart> = {
  title: 'Components/Charts/Performance Chart',
  component: PerformanceChart,
  argTypes: {
    users: {
      description: 'Array of user objects, each containing a username and data array to create charts.',
      control: 'object',
      table: {
        type: { summary: 'Array<{ username: string; data: number[]; }>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'This component displays a chart with a list of user, their average performance and a linear chart with their recent performance.',
      },
    },
    layout: 'centered',
    //Background color
    background: {
        color: '#F2F2F2',
        },
    controls: { expanded: true },
  },
};

export default meta;

const Template: StoryFn<IPerformanceChart> = (args) => <PerformanceChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  users: [
    { username: 'Agent 001', data: [10, 30, 50, 70, 70, 99] },
    { username: 'Agent 002', data: [20, 50, 15, 60, 20, 100] },
  ]
};

export const SingleUser = Template.bind({});
SingleUser.args = {
  users: [
    { username: 'Bruce Wayne', data: [90, 70, 89, 67, 100] }
  ]
};

export const MultipleUsers = Template.bind({});
MultipleUsers.args = {
  users: [
    { username: 'Barry Allen',     data: [65, 90, 65, 80, 100]   },
    { username: 'Diana Prince',    data: [55, 85, 59, 73, 100] },
    { username: 'Clark Kent',     data: [60, 50, 70, 100, 95]  },
    { username: 'Bruce Wayne',  data: [90, 70, 89, 67, 100]  },
    { username: 'Hall Jordan',   data: [69, 85, 49, 99, 62]  },
  ]
};
