import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import FeedbackCard from './FeedbackCard'; 
import { IFeedbackCard } from './types';
import profilePicture from '../../assets/images/Toretto.jpg'

const meta = {
  title: 'Components/FeedbackCard',
  component: FeedbackCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "FeedbackCard allows users to provide feedback with a title and suggestion.",
      },
      inlineStories: false,
      iframeHeight: 500,
    },
  },
  argTypes: {
    title: { 
      control: 'text',
      description: 'The title of the feedback card, in order to include the username'
    },
    profileImage: { 
      control: 'text' ,
      description: 'The profile image of the user'
    }
  },
  tags: ["UI", "Feedback"],
} as Meta<IFeedbackCard>;

export default meta;

const Template: StoryFn<IFeedbackCard> = (args) => <FeedbackCard {...args} />;

/**
 * Default story of FeedbackCard
 */
export const Default = Template.bind({});
Default.args = {
  title: "Feedback Example",
  profileImage: profilePicture,
};
