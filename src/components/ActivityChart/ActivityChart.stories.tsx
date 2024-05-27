import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ActivityChart from './ActivityChart';

const meta: Meta = {
    title: 'Components/Charts/Activity Chart',
    component: ActivityChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Displays activity as a line chart. This chart fetches and visualizes user engagement metrics directly, without external inputs.',
            },
            iframeHeight: 500,
        }
    },
    // Como tu componente no toma props externas, puedes quitar `argTypes` por completo.
};

export default meta;

const Template: StoryFn<typeof ActivityChart> = () => <ActivityChart />;

export const Default = Template.bind({});
