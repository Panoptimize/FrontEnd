import { Meta, StoryFn } from "@storybook/react";
import { ITextInput } from "./types";
import TextInput from "./TextInput";
import React from "react";

const meta: Meta<ITextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A customizable text input component with an icon.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    icon: { control: "text" },
  },
};

export default meta;

const Template: StoryFn<ITextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter text here...",
  icon: "https://img.icons8.com/ios/452/search--v1.png",
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
};
