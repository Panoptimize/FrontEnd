import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Loader from './Loader';

export default {
    title: 'Components/Loader',
    component: Loader,
} as Meta;

const Template: StoryFn = () => <Loader />;

export const Default = Template.bind({});