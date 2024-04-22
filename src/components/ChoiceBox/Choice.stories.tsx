import {Meta, StoryFn} from '@storybook/react';

import { IChoiceBox } from './types';
import {ChoiceBox} from './ChoiceBox';
import React from "react";




const meta = {
    title: 'Components/ChoiceBox',
    component: ChoiceBox,
    paramenters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The Choice box component for the panoptimize app, it accepts a string and a list of strings. The strings acts as the tag for the box and ",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        boxText: { control: 'text' },
        options: { control: 'text list' },
    },
    tags: ["autodocs"],
} as Meta;

const Template: React.FC<IChoiceBox> = (args) => <ChoiceBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  boxText: "Selecciona una opción:",
  options: [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
  ],
};
