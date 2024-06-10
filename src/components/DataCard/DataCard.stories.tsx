import { Meta, StoryFn } from '@storybook/react';

import { IDataCard } from './types';
import DataCard from './DataCard';
import React from 'react';

const meta ={
    title: 'Components/DataCard', //El slash va a hacer que cree una carpeta en storybook
    component: DataCard,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A data card component",
                // iframeHeight: 400,
            }
        }
    },

    argTypes: {
        title: { control: 'text' },
        content : { control: 'text' },
    },
    tags: ['autodocs'],

} as Meta;

export default meta;

//Le pasamos nuestro tipo para que sepa que props existen
const Template: StoryFn<IDataCard> = (args) => <DataCard {...args} />;

/**
 * Default story of the DataCard
 */
export const Default = Template.bind({});

Default.args = {
    title: 'Total Contacts',
    content: 53,
};

/**
 * Abandon Rate story of the DataCard
 */
export const AbandonRate = Template.bind({});

AbandonRate.args = {
    title: 'Abandon Rate',
    content: 11,
    decorator: "%"
};

/**
 * Average Call Time story of the DataCard
 */
export const AvgCall = Template.bind({});

AvgCall.args = {
    title: 'Average Call Time',
    content: 130,
    decorator: " seconds"
};