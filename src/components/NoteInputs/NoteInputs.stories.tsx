import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import NoteInputs from './NoteInputs';
import { INoteInputs } from './types';
import { IAgentPerformance } from '../../pages/types';

const meta: Meta<typeof NoteInputs> = {
    title: 'Components/NoteInputs',
    component: NoteInputs,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A NoteInputs component",
                iframeHeight: 600,
            }
        }
    },
    argTypes: {
        id: { control: 'number' },
        agentId: { control: 'number' },
        metrics: { control: 'object' },
        priority: { control: 'radio', options: ['LOW', 'MEDIUM', 'HIGH'] },
        title: { control: 'text' },
        text: { control: 'text' },
        closeWindow: { action: 'closeWindow' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<INoteInputs> = (args) => <NoteInputs {...args} />;

const agentPerformanceMock: IAgentPerformance = {
    avgAbandonTime: 30,
    avgAfterContactWorkTime: 45,
    avgHandleTime: 150,
    avgHoldTime: 20,
};

/**
 * Default story of the NoteInputs
 */
export const Default = Template.bind({});
Default.args = {
    id: 1,
    agentId: 1234,
    metrics: agentPerformanceMock,
    priority: "HIGH",
    title: "Sample Note",
    text: "This is a sample note.",
};

/**
 * No Metrics story of the NoteInputs
 */
export const NoMetrics = Template.bind({});
NoMetrics.args = {
    id: 1,
    agentId: 1234,
    metrics: agentPerformanceMock,
    priority: "HIGH",
    title: "Sample Note",
    text: "This is a sample note.",
};

/**
 * Creating Note story of the NoteInputs
 */
export const CreatingNote = Template.bind({});
CreatingNote.args = {
    agentId: 1234,
    metrics: agentPerformanceMock,
    priority: "MEDIUM",
    title: "New Note",
    text: "This is a new note.",
};
