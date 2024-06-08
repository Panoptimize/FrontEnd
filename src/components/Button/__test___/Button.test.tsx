import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Button from "../Button";
import { IButton } from "../types";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Button Component", () => {
  const renderComponent = (props: IButton) =>
    render(<Button {...props} data-testid="button" />);

  const testText:string = "This is test text."
  const testColor = "teal"
  const testImage:string = "Menu.svg"

  test("Renders without crashing", () => {
    const props: IButton = {
      baseColor: testColor,
    };
    renderComponent(props);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  test("Renders with text", () => {
    const props: IButton = {
      text: testText,
      baseColor: testColor,
    };
    renderComponent(props);
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent(testText);
  });

  test("Renders with an image", () => {
    const props: IButton = {
      image: testImage,
      baseColor: testColor,
    };
    renderComponent(props);
    const img = screen.getByAltText(testImage);
    expect(img).toBeInTheDocument();
  });

  test("Renders with both text and image", () => {
    const props: IButton = {
      text: testText,
      image: testImage,
      baseColor: testColor,
    };
    renderComponent(props);
    const button = screen.getByTestId("button");
    const img = screen.getByAltText(testImage);
    expect(button).toHaveTextContent(testText);
    expect(img).toBeInTheDocument();
  });

  test("Calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    const props: IButton = {
      text: testText,
      baseColor: testColor,
      onClick,
    };
    renderComponent(props);
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test("Does not render invalid image format", () => {
    console.error = jest.fn();
    const props: IButton = {
      image: "test.png",
      baseColor: testColor,
    };
    const { container } = renderComponent(props);
    expect(container).toBeEmptyDOMElement();
    expect(console.error).toHaveBeenCalledWith(
      "Only SVG files are supported for the image prop."
    );
  });
});
