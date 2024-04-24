import {Meta, StoryFn} from '@storybook/react';

import { IButton } from './types';
import Button from './Button';
import React from 'react';

const meta = {
    title: 'Components/Button',
    component: Button,
    paramenters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The Button component for Panoptimize",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        text: { control: 'text' },
        image: { control: 'text' },
        thickness: { control: 'text' },
        baseColor: {control: 'text' },
    },
    tags: ["autodocs"],
} as Meta

export default meta;

const Template: StoryFn<IButton> = (args) => <Button {...args} />;

/**
 * Default story for the Button
 */
export const Default = Template.bind({});
Default.args = {
    text: "Button text",
    image: "actionCenter",
    bold: false,
    baseColor: "teal",
}