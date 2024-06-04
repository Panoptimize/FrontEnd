import {Meta, StoryFn} from '@storybook/react';

import { IMultipleChoiceBox } from './types';
import MultipleChoiceBox from './MultipleChoiceBox';
import React from "react";

const meta = {
    title: 'Components/MultipleChoiceBox',
    component: MultipleChoiceBox,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The MultipleChoiceBox component for the panoptimize app. This component is similar to the ChoiceBox, but it allows for multiple selections. Each selection is represented as a chip.",
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

const Template: StoryFn<IMultipleChoiceBox> = (args) => <MultipleChoiceBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  selectedOptions: [],
};

export default meta;