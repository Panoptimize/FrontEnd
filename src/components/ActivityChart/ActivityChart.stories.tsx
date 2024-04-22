import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ActivityChart from './ActivityChart';
import { IActivityChart } from './types';

const meta: Meta<IActivityChart> = {
    title: 'Components/Charts/Activity Chart',
    component: ActivityChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Displays yearly activity as a line chart. Use this chart to visualize user engagement metrics across different months.',
            },
            iframeHeight: 500,
        },
        controls: { expanded: true }
    },
    argTypes: {
        data: {
            description: 'Array of monthly activity data points.',
            control: { type: 'object' },
            table: {
                type: { summary: 'number[]' },
                defaultValue: { summary: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]' },
            },
        },
    },
};

export default meta;

const Template: StoryFn<IActivityChart> = (args) => <ActivityChart {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: [10, 12, 13, 11, 15, 28, 10, 86, 63, 77, 55, 87],
};

export const Empty = Template.bind({});
Empty.args = {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export const RandomData = Template.bind({});
RandomData.args = {
    data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
};
