import type { Preview } from "@storybook/react";
import "!style-loader!css-loader!postcss-loader!../src/index.css";
import "!style-loader!css-loader!postcss-loader!../src/components/AgentTable/AgentTable.css";
import "!style-loader!css-loader!postcss-loader!../src/components/AgentTableRow/AgentTableRow.css";

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
