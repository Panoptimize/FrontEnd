import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ActivityChart from './ActivityChart';
import { IActivityChart } from './types'; // Asegúrate de que esta es la ubicación correcta de tus interfaces.

const meta: Meta = {
    title: 'Components/Charts/Activity Chart',
    component: ActivityChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Displays activity as a line chart using passed data. Useful for visualizing user engagement over time.',
            },
            iframeHeight: 500,
        }
    },
};

export default meta;

// Datos de prueba para el story
const sampleChartData: IActivityChart = {
    data: [
        { value: 10, startTime: '2024-06-01T00:00:00Z' },
        { value: 20, startTime: '2024-06-02T00:00:00Z' },
        { value: 15, startTime: '2024-06-03T00:00:00Z' },
        { value: 30, startTime: '2024-06-04T00:00:00Z' },
        { value: 10, startTime: '2024-06-05T00:00:00Z' },
    ]
};

const Template: StoryFn<typeof ActivityChart> = (args) => <ActivityChart {...args} />;

export const Default = Template.bind({});
// Asigna los datos de prueba al story por defecto
Default.args = {
    chartData: sampleChartData
};
