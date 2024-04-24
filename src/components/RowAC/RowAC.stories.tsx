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
                description: "Agent row component",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        callstatus: { control: { type: "text" } },
        agentImage: { control: { type: "text" } },
        name: { control: { type: "text" } },
        status: { control: { type: "text" } },
        workspace1: { control: { type: "text" } },
        workspace2: { control: { type: "text" } },
        workHours: { control: { type: "number" } },
        alarm: { control: { type: "boolean" } },
    },
    tags: ["autodocs"],
} as Meta;

export default meta;

const Templates: StoryFn<IRowAC> = (args) => <RowAC {...args} />;



export const Default = Templates.bind({});
Default.args = {
    callstatus: '00:04:15',
    agentImage: 'https://randomuser.me/api/portraits/women/48.jpg',
    name: 'Olivia',
    status: 'Online',
    workspace1: 'Sales',
    workspace2: 'Delivery',
    workHours: '04:32:13',
    alarm: false,
}