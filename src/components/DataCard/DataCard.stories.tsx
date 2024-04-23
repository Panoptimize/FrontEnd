import { Meta, StoryFn } from '@storybook/react';

import { IDataCard } from './types';
import DataCard from './DataCard';
import React from 'react';

const meta ={
    title: 'Component/DataCard', //El slash va a hacer que cree una carpeta en storybook
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
        content : { control: 'number' },
    },
    tags: ['autodocs'],

} as Meta;

export default meta;

//Le pasamos nuestro tipo para que sepa que props existen
const Template: StoryFn<IDataCard> = (args) => <DataCard {...args} />;

/**
 * Default story of the MovieCard
 */

export const Default = Template.bind({});

Default.args = {
    title: 'Total Contacts',
    content: '53',
};