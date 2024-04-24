import { Meta, StoryFn } from '@storybook/react';

import { IStatusCard } from './types';
import StatusCard from './StatusCard';
import React from 'react';

const meta ={
    title: 'Components/StatusCard', //El slash va a hacer que cree una carpeta en storybook
    component: StatusCard,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A status card component",
                // iframeHeight: 400,
            }
        }
    },

    argTypes: {
        status: { control: 'text' },
        numUsers : { control: 'number' },
        color: { control: 'text' },
    },
    tags: ['autodocs'],

} as Meta;

export default meta;

//Le pasamos nuestro tipo para que sepa que props existen
const Template: StoryFn<IStatusCard> = (args) => <StatusCard {...args} />;

/**
 * Default story of the MovieCard
 */

export const Default = Template.bind({});

Default.args = {
    status: 'Available',
    numUsers : 16,
    color: 'bg-green-500',
};

/**
 * Offline story of the MovieCard
 */
export const Offline = Template.bind({});
Offline.args = {
    status: 'Offline',
    numUsers: 0,
    color: 'bg-slate-700',
};