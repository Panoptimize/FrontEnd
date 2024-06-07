import { screen, render, cleanup } from "@testing-library/react";
import Avatar from "../Avatar";
import { IAvatar } from "../types";

afterEach(() => {
  cleanup();
});

jest.mock("../../Avatar", () => ({
    Avatar: () => (
        <div data-testid="Avatar">
            <img src=" " alt=" " />
        </div>
    ),

}));

describe("Avatar component", () => {
    const renderComponent = (props: IAvatar) =>
        render(
            <Avatar {...props} data-testid="Avatar"/>
        );

    const props: IAvatar = {
        profile_img: " ",
        state: false,
        size: "small",
        square_border: false,
    };

    test("Renders without crashing", () => {
        renderComponent(props);
        expect(screen.getByTestId("Avatar")).toBeInTheDocument();
        
    });
});