import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import TimeFrameSelector from './TimeFrameSelector';
import { ITimeFrameSelector } from './types';

const meta: Meta<typeof TimeFrameSelector> = {
    title: 'Components/TimeFrameSelector',
    component: TimeFrameSelector,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A TimeFrameSelector component",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        startDate: { control: 'date' },
        endDate: { control: 'date' },
        limit: { control: 'number' },
        setStartDate: { action: 'setStartDate' },
        setEndDate: { action: 'setEndDate' },
    },
    tags: ["autodocs"]
};

export default meta;

const Template: StoryFn<ITimeFrameSelector> = (args) => {
    const [startDate, setStartDate] = useState(args.startDate);
    const [endDate, setEndDate] = useState(args.endDate);

    return (
        <TimeFrameSelector
            {...args}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
        />
    );
};

/**
 * Default story of the TimeFrameSelector
 */
export const Default = Template.bind({});
Default.args = {
    startDate: '2024-06-01',
    endDate: '2024-06-10',
    limit: 30,
};
