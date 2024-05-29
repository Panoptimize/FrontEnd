
import { Meta, StoryFn } from "@storybook/react";
import AgentTable from "./AgentTable";
import React from "react";
import { IAgentTable } from "./types";


const meta = {
  title: "Components/AgentTable",
  component: AgentTable,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        description: "Agent table component",
        iframeHeight: 400,
      },
    },
  },
  argTypes: {
    row: { control: { type:"object" } },
  },
  tags: ["autodocs"],
} as Meta;

export default meta;

const Templates: StoryFn<IAgentTable> = (args) => <AgentTable {...args} />;

/**
 * Default story of the AgentTableRow
 */

export const Default = Templates.bind({});
Default.args = {
  rows: [
    {
      agentImage:
        "ProfileIcon.svg",
      name: "Mark Hamill",
      workspace1: "Sales",
      workspace2: "Delivery",
      overallScore: 90,
      lastActivity: "3 days ago",
      details: "View Details",
      id: "1"
    },
  ],
};
