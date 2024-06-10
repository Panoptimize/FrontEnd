import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import AgentTable from './AgentTable';
import { IAgentTable } from './types';
import { IAgentTableRow } from '../AgentTableRow/types';

const meta: Meta<typeof AgentTable> = {
    title: 'Components/AgentTable',
    component: AgentTable,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The AgentTable component for Panoptimize",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        rows: { control: 'object' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<IAgentTable> = (args) => <AgentTable {...args} />;

// Define los datos de prueba
const agentRowsMock: IAgentTableRow[] = [
    {
        id: '1',
        name: 'John Doe',
        workspace1: 'Workspace A',
        workspace2: 'Workspace B',
        overallScore: 95,
        email: 'john.doe@example.com',
        lastActivity: '2024-06-10',
        details: 'Details about John Doe'
    },
    {
        id: '2',
        name: 'Jane Smith',
        workspace1: 'Workspace C',
        overallScore: 80,
        email: 'jane.smith@example.com',
        lastActivity: '2024-06-09',
        details: 'Details about Jane Smith'
    },
    {
        id: '3',
        name: 'Alice Johnson',
        workspace1: 'Workspace D',
        overallScore: 88,
        email: 'alice.johnson@example.com',
        lastActivity: '2024-06-08',
        details: 'Details about Alice Johnson'
    }
];

/**
 * Default story for the AgentTable
 */
export const Default = Template.bind({});
Default.args = {
    rows: agentRowsMock,
};
