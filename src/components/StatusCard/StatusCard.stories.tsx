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
            }
        }
    },

    argTypes: {
        status: { control: 'text' },
        numUsers : { control: 'number' }
    },
    tags: ['autodocs'],

} as Meta;

export default meta;

//Le pasamos nuestro tipo para que sepa que props existen
const Template: StoryFn<IStatusCard> = (args) => <StatusCard {...args} />;

/**
 * Default (Available) story of the StatusCard
 */

export const Default = Template.bind({});
Default.args = {
    status: 'AGENTS',
    numUsers : 16
};

/**
 * Offline story of the StatusCard
 */
export const Offline = Template.bind({});
Offline.args = {
    status: 'AGENTS_ONLINE',
    numUsers: 0
};

/**
//  * After Call Work story of the StatusCard
//  */
// export const AfterCallWork = Template.bind({});
// AfterCallWork.args = {
//     status: 'AGENTS_AFTER_CONTACT_WORK',
//     numUsers: 3
// };

// /**
//  * In Contact story of the StatusCard
//  */
// export const InContact = Template.bind({});
// InContact.args = {
//     status: 'AGENTS_ON_CONTACT',
//     numUsers: 20
// }


/**
 * After Call Work story of the StatusCard
 */
export const AfterCallWork = Template.bind({});
AfterCallWork.args = {
    status: 'AGENTS_AVAILABLE',
    numUsers: 3
};

/**
 * In Contact story of the StatusCard
 */
export const InContact = Template.bind({});
InContact.args = {
    status: 'AGENTS_OFFLINE',
    numUsers: 20
}