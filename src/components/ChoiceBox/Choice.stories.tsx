import {Meta, StoryFn} from '@storybook/react';


import { IChoiceBox } from './types';
import ChoiceBox from './ChoiceBox';
import React from "react";



const meta = {
    title: 'Components/ChoiceBox',
    component: ChoiceBox,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The Choice box component for the panoptimize app, it accepts a string and a list of strings.",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        boxText: { control: 'text' },
        options: { control: 'object' },
    },
    tags: ["autodocs"],
} as Meta;



const Template: StoryFn<IChoiceBox> = (args) => <ChoiceBox {...args} />;

/** 
 * Default story of Choice box
*/

export const Default = Template.bind({});
Default.args = {
  boxText: "Select an option:",
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
};

export default meta;