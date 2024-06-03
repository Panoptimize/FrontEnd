import {Meta, StoryFn} from '@storybook/react';
import { IAvatar } from './types';
import Avatar from './Avatar';
import React from 'react';

const meta ={
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                description: "An Avatar component",
                
            }
        }
    },
    argTypes: {
        profile_img: {control: 'text'},
        state: {control: 'boolean'},
        state_color: {control: 'text'},
        size: {control: 'text'},
        square_border: {control: 'boolean'},

    },
    tags: ["autodocs"]
} as Meta;

export default meta;

const Template: StoryFn<IAvatar> = (args) => <Avatar {...args} />;

/**
 * Default story of the Avatar component
 */
export const Default = Template.bind({});
Default.args = {
    profile_img:'',
    state: false,
    state_color: '',	
    size: 'large',
    square_border: false
}