import { Meta, StoryFn } from '@storybook/react';
import Button from './Button';
import { IButton } from './types';
import React from 'react';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
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
        bold: { control: 'boolean' },
        baseColor: { control: 'radio', options: ['teal', 'rose', 'gray', 'transparent', 'mint'] },
        onClick: { action: 'clicked' }
    },
    tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<IButton> = (args) => <Button {...args} />;

/**
 * Default story for the Button
 */
export const Default = Template.bind({});
Default.args = {
    text: "Button text",
    image: "ActionCenter.svg",
    bold: false,
    baseColor: "teal",
};

export const Bold = Template.bind({});
Bold.args = {
    text: "Bold Button",
    image: "ActionCenter.svg",
    bold: true,
    baseColor: "rose",
};

export const Transparent = Template.bind({});
Transparent.args = {
    text: "Transparent Button",
    bold: false,
    baseColor: "transparent",
};

export const WithImage = Template.bind({});
WithImage.args = {
    text: "Button with Image",
    image: "Dashboard.svg",
    bold: false,
    baseColor: "mint",
};
