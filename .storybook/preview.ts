import type { Preview } from "@storybook/react";

import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import "!style-loader!css-loader!postcss-loader!../src/index.css";
// Imports form CSS files for components
  // AgentTable
import "!style-loader!css-loader!postcss-loader!../src/components/AgentTable/AgentTable.css";
  // AgentTableRow
import "!style-loader!css-loader!postcss-loader!../src/components/AgentTableRow/AgentTableRow.css";
  // Avatar
import "!style-loader!css-loader!postcss-loader!../src/components/Avatar/Avatar.css";
  // Button
import "!style-loader!css-loader!postcss-loader!../src/components/Button/Button.css";
  // PIll
import "!style-loader!css-loader!postcss-loader!../src/components/Pill/Pill.css";
  // TableAC
import '!style-loader!css-loader!postcss-loader!../src/components/TableAC/TableAC.css';
  // RowAC
import '!style-loader!css-loader!postcss-loader!../src/components/RowAC/RowAC.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
