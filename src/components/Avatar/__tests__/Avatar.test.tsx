import { screen, render, cleanup } from "@testing-library/react";
import Avatar from "../Avatar";
import { IAvatar } from "../types";

afterEach(() => {
  cleanup();
});

jest.mock("../../Avatar", () => ({
    Avatar: () => (
        <div data-testid="Avatar"/>    
    ),

}));

describe("Avatar component", () => {
    const renderComponent = (props: IAvatar) =>
        render(
            <Avatar {...props} data-testid="Avatar"/>
        );
        
    test("Simply renders the component with default values", () => {
        const props: IAvatar = {};
        renderComponent(props);
        expect(screen.getByTestId("Avatar")).toBeInTheDocument();
        
    });

    test("Renders with a custom image", () => {
        const props: IAvatar = {
            profile_img: "https://lh3.googleusercontent.com/a/AGNmyxaDl5ovbY3IGIeXWO5NS4004cyM1rmWGy9Uh7h_J30=s96-c",
        };
        renderComponent(props);
        const img = screen.getByAltText('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'https://lh3.googleusercontent.com/a/AGNmyxaDl5ovbY3IGIeXWO5NS4004cyM1rmWGy9Uh7h_J30=s96-c');
    });

    test("Displays the icon when state is true (color green)", () => {
        const props: IAvatar = {
            state: true,
            state_color: "green",
        };
        renderComponent(props);
        const stateIcon = screen.getByAltText("icon");
        expect(stateIcon).toBeInTheDocument();
        expect(stateIcon).toHaveAttribute("src", "check_mark.png");
    });

    test("Displays the icon when state is true (color purple)", () => {
        const props: IAvatar = {
            state: true,
            state_color: "purple",
        };
        renderComponent(props);
        const stateIcon = screen.getByAltText("icon");
        expect(stateIcon).toBeInTheDocument();
        expect(stateIcon).toHaveAttribute("src", "plus.png");
    });

    test("Displays the icon when state is true (color orange)", () => {
        const props: IAvatar = {
            state: true,
            state_color: "orange",
        };
        renderComponent(props);
        const stateIcon = screen.getByAltText("icon");
        expect(stateIcon).toBeInTheDocument();
        expect(stateIcon).toHaveAttribute("src", "minus.png");
    });

    test("Displays the icon when state is true (color grey)", () => {
        const props: IAvatar = {
            state: true,
            state_color: "grey",
        };
        renderComponent(props);
        const stateIcon = screen.getByAltText("icon");
        expect(stateIcon).toBeInTheDocument();
        expect(stateIcon).toHaveAttribute("src", "x-mark.png");
    });

    test("Displays the icon when state is true (color black)", () => {
        const props: IAvatar = {
            state: true,
            state_color: "black",
        };
        renderComponent(props);
        const stateIcon = screen.getByAltText("icon");
        expect(stateIcon).toBeInTheDocument();
        expect(stateIcon).toHaveAttribute("src", "Rectangle 173.png");
    });

    test("Displays the icon when state is false", () => {
        const props: IAvatar = {
            state: false,
        };
        renderComponent(props);
        const stateIcon = screen.queryByAltText("icon");
        expect(stateIcon).not.toBeInTheDocument();
    });

    test("Displays the icon in a small size", () => {
        const props: IAvatar = {
            size: "small",
        };
        renderComponent(props);
        const iconSize = screen.getByTestId("Avatar");
        expect(iconSize).toHaveStyle({ width: "40px", height: "40px" });
    });

    test("Displays the icon in a large size", () => {
        const props: IAvatar = {
            size: "large",
        };
        renderComponent(props);
        const iconSize = screen.getByTestId("Avatar");
        expect(iconSize).toHaveStyle({ width: "100px", height: "100px" });
    });

    test("Displays the icon with a square border", () => {
        const props: IAvatar = {
            square_border: true,
        };
        renderComponent(props);
        const iconForm = screen.getByTestId("Avatar");
        expect(iconForm).toHaveStyle({ borderRadius: "8px" });
    });

    test("Displays the icon with a circular border", () => {
        const props: IAvatar = {
            square_border: false,
        };
        renderComponent(props);
        const iconForm = screen.getByTestId("Avatar");
        expect(iconForm).toHaveStyle({ borderRadius: "100px" });
    });


});