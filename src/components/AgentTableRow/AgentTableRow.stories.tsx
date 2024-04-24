import { Meta, StoryFn } from "@storybook/react";
import AgentTableRow from "./AgentTableRow";
import { IAgentTableRow } from "./types";
import React from "react";

const meta = {
  title: "Components/AgentTableRow",
  component: AgentTableRow,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        description: "Agent row component",
        iframeHeight: 400,
      },
    },
  },
  argTypes: {
    agentImage: { control: "text" },
    name: { control: "text" },
    workspace1: { control: "text" },
    workspace2: { control: "text" },
    overallScore: { control: "number" },
    lastActivity: { control: "text" },
    details: { control: "text" },
  },
  tags: ["autodocs"],
} as Meta;

export default meta;

const Templates: StoryFn<IAgentTableRow> = (args) => (
  <AgentTableRow {...args} />
);

/**
 * Default story of the AgentTableRow
 */

export const Default = Templates.bind({});
Default.args = {
  agentImage:
    "https://saki.ichoria.org/f/y3gml/Mark_Hamill_by_Gage_Skidmore_2.jpg",
  name: "Mark Hamill",
  workspace1: "Sales",
  workspace2: "Delivery",
  overallScore: 90,
  lastActivity: "3 days ago",
  details: "View Details",
};
