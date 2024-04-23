import { Meta, StoryFn } from '@storybook/react';
import AgentTable from './AgentTable';

const meta = {
    title: 'Components/AgentTable',
    component: AgentTable,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "Agent table component",
                iframeHeight: 400,
            }
        }
    },
    tags: ["autodocs"],
}as Meta;

export default meta;

/*
TODO: Finish table component storybook
*/