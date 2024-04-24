import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { default as Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
  render: () => <Sidebar />,
};
