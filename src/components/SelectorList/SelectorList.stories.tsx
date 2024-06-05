import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { SelectorListProps } from "./types";
import SelectorList from "./SelectorList";

const meta: Meta<SelectorListProps> = {
    title: 'Components/SelectorList',
    parameters: {
        docs: {
            inline: false,
            storyDescription: 'This component is used for displaying a list of selectable items.'
        }
    },
    argTypes: {
        items: {
            control: {
                type: 'object'
            }
        },
        selected: {
            control: {
                type: 'object'
            }
        },
        setSelected: {
            action: 'onChange'
        }
    },
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn<SelectorListProps> = (args) => <SelectorList {...args} />;

export const Default = Template.bind({});
Default.args = {
    items: [
        { value: 'Item 1', label: 'Item 1' },
        { value: 'Item 2', label: 'Item 2' },
        { value: 'Item 3', label: 'Item 3' }
    ],
    selected: [],
    setSelected: (selected) => console.log(selected)
};

export const WithSelected = Template.bind({});
WithSelected.args = {
    items: [
        { value: 'Item 1', label: 'Item 1' },
        { value: 'Item 2', label: 'Item 2' },
        { value: 'Item 3', label: 'Item 3' }
    ],
    selected: [
        { value: 'Item 1', label: 'Item 1' }
    ],
    setSelected: (selected) => console.log(selected)
};
