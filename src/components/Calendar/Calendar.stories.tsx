import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Calendar from "./Calendar";
import { ICalendarView } from "./types";

const meta: Meta = {
    title: 'Components/Calendar',
    component: Calendar,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "The Calendar component for Panoptimize",
                iframeHeight: 600,
            }
        },
        actions: {
            handles: ["click .day"],
        }
    },
    argTypes: {
        text: {
            description: "The text to display in the CalendarView",
            control: {
                type: "text",
            },
        },
        startDate: {
            description: "The start date of the interval",
            control: {
                type: "date",
            },
        },
        endDate: {
            description: "The end date of the interval",
            control: {
                type: "date",
            },
        },
        limit: {
            description: "The limit of the interval",
            control: {
                type: "number",
            },
        },
    },
    tags: ["autodocs"],
}

export default meta;

const Template: StoryFn<ICalendarView> = (args) => <Calendar {...args} />;

/**
 * Default story for the CalendarView
 */
export const Default = Template.bind({});
Default.args = {
    text: "Calendar text",
    startDate: "2024-06-06",
    endDate: "2024-06-12",
    limit: 30
}