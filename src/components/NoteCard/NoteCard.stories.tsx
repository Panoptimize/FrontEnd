import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import NoteCard from './NoteCard';
import { INoteCard } from './types';
import { IAgentPerformance } from '../../pages/types';

const meta: Meta<typeof NoteCard> = {
    title: 'Components/NoteCard',
    component: NoteCard,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A NoteCard component",
                iframeHeight: 600,
            }
        }
    },
    argTypes: {
        bttnTitle: { control: 'text' },
        title: { control: 'text' },
        name: { control: 'text' },
        email: { control: 'text' },
        area: { control: 'text' },
        username: { control: 'text' },
        profileImage: { control: 'text' },
        selectedWorkspaces: { control: 'object' },
        availableWorkspaces: { control: 'object' },
        bttn_color: { control: 'radio', options: ['teal', 'rose', 'gray', 'transparent', 'mint'] },
        text: { control: 'text' },
        priority: { control: 'radio', options: ['LOW', 'MEDIUM', 'HIGH'] },
        id: { control: 'number' },
        connectId: { control: 'text' },
        agentId: { control: 'number' },
        signalNotesRow: { action: 'signalNotesRow' },
        metrics: { control: 'object' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<INoteCard> = (args) => <NoteCard {...args} />;

const agentPerformanceMock: IAgentPerformance = {
    avgAbandonTime: 30,
    avgAfterContactWorkTime: 45,
    avgHandleTime: 150,
    avgHoldTime: 20,
};

/**
 * Default story of the NoteCard
 */
export const Default = Template.bind({});
Default.args = {
    bttnTitle: "Add note",
    title: "Test Note",
    text: "This is a test note.",
    priority: "HIGH",
    id: 1,
    connectId: "1234",
    name: "John Doe",
    metrics: agentPerformanceMock,
    area: "Support",
    bttn_color: "teal",
    signalNotesRow: () => console.log("Signal sent to row"),
};

/**
 * No Metrics story of the NoteCard
 */
export const NoMetrics = Template.bind({});
NoMetrics.args = {
    bttnTitle: "Add note",
    title: "Test Note",
    text: "This is a test note.",
    priority: "HIGH",
    id: 1,
    connectId: "1234",
    name: "John Doe",
    metrics: agentPerformanceMock,
    area: "Support",
    bttn_color: "rose",
    signalNotesRow: () => console.log("Signal sent to row"),
};

/**
 * Custom Button story of the NoteCard
 */
export const CustomButton = Template.bind({});
CustomButton.args = {
    bttnTitle: "Open Note",
    title: "Test Note",
    text: "This is a test note.",
    priority: "MEDIUM",
    id: 2,
    connectId: "5678",
    name: "Jane Smith",
    metrics: agentPerformanceMock,
    area: "Sales",
    bttn_color: "mint",
    signalNotesRow: () => console.log("Signal sent to row"),
};

/**
 * Fetch Metrics story of the NoteCard
 */
export const FetchMetrics = Template.bind({});
FetchMetrics.args = {
    bttnTitle: "Add note",
    title: "Test Note",
    text: "This is a test note.",
    priority: "HIGH",
    connectId: "91011",
    name: "Alice Johnson",
    area: "Marketing",
    bttn_color: "rose",
    signalNotesRow: () => console.log("Signal sent to row"),
};
