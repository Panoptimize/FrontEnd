import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { TextInput } from "../TextInput";
import { ITextInput, TextInputRef } from "../types";

afterEach(cleanup);

describe("TextInput component", () => {
  const renderComponent = (props: ITextInput, ref: React.RefObject<TextInputRef>) =>
    render(<TextInput {...props} ref={ref} />);

  test("Renders without crashing", () => {
    const props: ITextInput = {
      placeholder: "Enter text",
      icon: "icon.png",
      size: "big",
      text: "Initial text"
    };
    const ref = React.createRef<TextInputRef>();

    renderComponent(props, ref);

    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toHaveValue("Initial text");
    expect(screen.getByAltText("Icon")).toBeInTheDocument();
  });

  test("Handles input change correctly", () => {
    const props: ITextInput = {
      placeholder: "Enter text",
      size: "small",
      text: "Initial text"
    };
    const ref = React.createRef<TextInputRef>();

    renderComponent(props, ref);

    const textarea = screen.getByPlaceholderText("Enter text") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "New text" } });

    expect(textarea).toHaveValue("New text");
  });

  test("Exposes getValue method via ref", () => {
    const props: ITextInput = {
      placeholder: "Enter text",
      size: "big",
      text: "Initial text"
    };
    const ref = React.createRef<TextInputRef>();

    renderComponent(props, ref);

    const textarea = screen.getByPlaceholderText("Enter text") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "New text" } });

    expect(ref.current?.getValue()).toBe("New text");
  });
});
