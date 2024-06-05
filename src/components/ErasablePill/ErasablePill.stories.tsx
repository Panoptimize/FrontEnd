import {Meta, StoryFn} from '@storybook/react';
import { IErasablePill } from './types';
import ErasablePill from './ErasablePill';
import React from "react";

const meta ={
    title: 'Components/ErasablePill',
    component: ErasablePill,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The ErasablePill component for the panoptimize app. This component is similar to the ChoiceBox, but it allows for multiple selections. Each selection is represented as a chip.",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        options: { control: 'object' },
        selectedOptions: { control: 'object' },
    },
    tags: ["autodocs"],
} as Meta;

const Template: StoryFn<IErasablePill> = (args) => <ErasablePill {...args} />;
export const Default = Template.bind({});
Default.args = {
    selectedOption: { value: "option1", label: "Option 1" },
};

export default meta;