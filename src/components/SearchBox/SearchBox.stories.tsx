import { Meta, StoryFn } from '@storybook/react';

import { SearchBoxProps } from './types';
import SearchBox from './SearchBox';
import React from 'react';

const meta: Meta<SearchBoxProps> = {
    title: 'Components/SearchBox',
    component: SearchBox,
    parameters: {
        docs: {
            story: {
                inline: false,
                description: 'This component is used for searching something within the database.'
            }
        }
    }, 
    argTypes: {
        hint: {
            control: {
                type: 'text'
            },
        }, 
        handleSearch: {
            action: 'handleSearch'
        }
    }, 
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn<SearchBoxProps> = (args) => <SearchBox {...args} />;
export const Default = Template.bind({});

Default.args = {
    handleSearch: (searchTerm: string) => console.log(searchTerm)
};

export const CustomHint = Template.bind({});
CustomHint.args = {
    hint: 'Search with another hint',
    handleSearch: (searchTerm: string) => console.log(searchTerm)
};