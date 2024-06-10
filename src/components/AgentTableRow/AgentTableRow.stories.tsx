import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import AgentTableRow from './AgentTableRow';
import { IAgentTableRow } from './types';

const meta: Meta<typeof AgentTableRow> = {
    title: 'Components/AgentTableRow',
    component: AgentTableRow,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The AgentTableRow component for Panoptimize",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        agentImage: { control: 'text' },
        name: { control: 'text' },
        workspace1: { control: 'text' },
        workspace2: { control: 'text' },
        lastActivity: { control: 'text' },
        id: { control: 'text' },
        email: { control: 'text' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<IAgentTableRow> = (args) => <table><tbody><AgentTableRow {...args} /></tbody></table>;

/**
 * Default story for the AgentTableRow
 */
export const Default = Template.bind({});
Default.args = {
    agentImage: "agent.svg",
    name: "John Doe",
    workspace1: "Workspace A",
    workspace2: "Workspace B",
    lastActivity: "2024-06-10",
    id: "1",
    email: "john.doe@example.com",
};
