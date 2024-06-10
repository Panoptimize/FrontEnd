import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import NotesRow from './NotesRow';
import { INotesRow } from './types';

const meta: Meta<typeof NotesRow> = {
    title: 'Components/NotesRow',
    component: NotesRow,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A NotesRow component",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        id: { control: 'number' },
        name: { control: 'text' },
        area: { control: 'text' },
        title: { control: 'text' },
        priority: { control: 'radio', options: ['LOW', 'MEDIUM', 'HIGH'] },
        updateDate: { control: 'text' },
        description: { control: 'text' },
        signalToNotesTable: { action: 'signalToNotesTable' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<INotesRow> = (args) => <NotesRow {...args} />;

/**
 * Default story of the NotesRow
 */
export const Default = Template.bind({});
Default.args = {
    id: 1,
    name: "John Doe",
    area: "Support",
    title: "Sample Note",
    priority: "HIGH",
    updateDate: "2024-06-10",
    description: "This is a sample note description.",
};

/**
 * Medium Priority story of the NotesRow
 */
export const MediumPriority = Template.bind({});
MediumPriority.args = {
    id: 2,
    name: "Jane Smith",
    area: "Sales",
    title: "Medium Priority Note",
    priority: "MEDIUM",
    updateDate: "2024-06-10",
    description: "This note has medium priority.",
};

/**
 * Low Priority story of the NotesRow
 */
export const LowPriority = Template.bind({});
LowPriority.args = {
    id: 3,
    name: "Alice Johnson",
    area: "Marketing",
    title: "Low Priority Note",
    priority: "LOW",
    updateDate: "2024-06-10",
    description: "This note has low priority.",
};
