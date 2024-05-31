// RowAC.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import RowAC from './RowAC'
import { IRowAC } from './types'
import React from 'react';

const meta = {
    title: 'Components/RowAC',
    component: RowAC,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "Agent row component showcasing the agent's details including current time, status, ID, temperature, and communication channel.",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        currentTime: { control: { type: "text" } },
        agentImage: { control: { type: "text" } },
        name: { control: { type: "text" } },
        status: { control: { type: "text" } },
        agentId: { control: { type: "text" } },
        temperature: { control: { type: "radio", options: ['High', 'Medium', 'Low'] } },
        channel: { control: { type: 'radio', options: ['Voice', 'Chat'] } }, // Control para seleccionar el canal
    },
    tags: ["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<IRowAC> = (args) => <RowAC {...args} />;

export const Default = Template.bind({});
Default.args = {
    currentTime: '00:04:15',
    agentImage: 'https://randomuser.me/api/portraits/women/48.jpg',
    name: 'Olivia',
    status: 'Online',
    agentId: '12345-67890-ABCD',
    temperature: 'High',
    channel: 'Voice',  // Valor predeterminado para el canal
}