import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import UserInfoCard from './UserInfoCard';
import { IUserInfoCard } from './types';
import profilePicture from '../../assets/images/Toretto.jpg'

const meta = {
  title: 'Components/UserInfoCard',
  component: UserInfoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "UserInfoCard displays user information and allows selection of workspaces",
      },
      inlineStories: false,
      iframeHeight: 500,
    },
  },
  argTypes: {
    title: { 
      control: 'text',
      description: 'Title of the card, in order to be "Edit Agent Details" or "Create New Agents" '
    },
    name: { 
      control: 'text',
      description: 'Name of the user' 
    },
    email: { 
      control: 'text',
      description: 'Email of the user'
    },
    username: { 
      control: 'text',
      description: 'Username of the user'
    },
    profileImage: { 
      control: 'text',
      description: 'Profile image of the user' 
    },
    selectedWorkspaces: {
      control: { type: 'array' },
      description: 'Pre-selected workspaces for the user'
    },
    availableWorkspaces: {
      control: { type: 'array' },
      description: 'List of available workspaces that the user can select from'
    },
  },
  tags: ["UI", "User Management"],
} as Meta<IUserInfoCard>;

export default meta;

const Template: StoryFn<IUserInfoCard> = (args) => <UserInfoCard {...args} />;

/**
 * CreateNewAgent story of UserInfoCard
 */
export const CreateNewAgent = Template.bind({});
CreateNewAgent.args = {
  title: "Create New Agent",
  name: "Name",
  email: "Email",
  username: "Username",
  profileImage: profilePicture,
  selectedWorkspaces: [],
  availableWorkspaces: ['Sales', 'Marketing', 'Development', 'Customer Support'],
};

/**
 * EditAgentDetails story of UserInfoCard
 */
export const EditAgentDetails = Template.bind({});
EditAgentDetails.args = {
  title: "Edit Agent Details",
  name: "John Doe",
  email: "johndoe@example.com",
  username: "johndoe",
  profileImage: profilePicture,
  selectedWorkspaces: ['Sales', 'Marketing'],
  availableWorkspaces: ['Sales', 'Marketing', 'Development', 'Customer Support'],
};