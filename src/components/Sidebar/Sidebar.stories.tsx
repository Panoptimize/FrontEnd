import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Sidebar from './Sidebar';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  // No argTypes needed as there are no props to control
  parameters: {
    layout: 'fullscreen'  // Use the full screen layout to better see the sidebar behavior
  }
};

export default meta;

const Template: StoryFn<typeof Sidebar> = () => <Sidebar />;
export const Default = Template.bind({});
// No args to pass since there are no props
