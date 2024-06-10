import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import NotesTable from './NotesTable';
import { INotesTable } from './types';
import { INoteData } from '../../pages/types';
import { Priority } from '../../constants/Priority';

const meta: Meta<typeof NotesTable> = {
    title: 'Components/NotesTable',
    component: NotesTable,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A NotesTable component",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        name: { control: 'text' },
        area: { control: 'text' },
        notesData: { control: 'object' },
        signalToAgentCard: { action: 'signalToAgentCard' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<INotesTable> = (args) => <NotesTable {...args} />;

// Define los datos de prueba
const notesDataMock: INoteData[] = [
    {
        id: 1,
        name: "Sample Note 1",
        priority: Priority.HIGH,
        updatedAt: "2024-06-10",
        createdAt: "2024-06-01",
        description: "This is a sample note description 1.",
        solved: false
    },
    {
        id: 2,
        name: "Sample Note 2",
        priority: Priority.MEDIUM,
        updatedAt: "2024-06-09",
        createdAt: "2024-06-01",
        description: "This is a sample note description 2.",
        solved: true
    },
    {
        id: 3,
        name: "Sample Note 3",
        priority: Priority.LOW,
        updatedAt: "2024-06-08",
        createdAt: "2024-06-01",
        description: "This is a sample note description 3.",
        solved: false
    }
];

/**
 * Default story of the NotesTable
 */
export const Default = Template.bind({});
Default.args = {
    name: "John Doe",
    area: "Support",
    notesData: notesDataMock,
};

/**
 * Sorted by Priority story of the NotesTable
 */
export const SortedByPriority = Template.bind({});
SortedByPriority.args = {
    name: "Jane Smith",
    area: "Sales",
    notesData: notesDataMock,
};

/**
 * Sorted by Date story of the NotesTable
 */
export const SortedByDate = Template.bind({});
SortedByDate.args = {
    name: "Alice Johnson",
    area: "Marketing",
    notesData: notesDataMock,
};
