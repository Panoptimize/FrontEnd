import { screen, render, cleanup } from "@testing-library/react";
import ChoiceBox from "../ChoiceBox";
import { ChoiceBoxRef, IChoiceBox } from "../types";
import { Priority } from "../../../../constants/Priority";
import userEvent from '@testing-library/user-event';

afterEach(() => {
    cleanup();
});

describe("Choice Box Component", () => {
    const renderComponent = (props: IChoiceBox) => render(
        <table>
            <tbody>
                <ChoiceBox {...props}></ChoiceBox>
            </tbody>
        </table>,
    );

    const props: IChoiceBox = {
        boxText: "Select your workspace",
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ],
        chosen: "option1"
    };

    test("Renders with no crashes", () => {
        renderComponent(props);
    });

    test("Renders the label text correctly", () => {
        renderComponent(props);
        expect(screen.getByText("Select your workspace")).toBeInTheDocument();
    });

    test("Renders all options correctly", () => {
        renderComponent(props);
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
        expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    test("Changes selection correctly", () => {
        renderComponent(props);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        userEvent.selectOptions(select, "option2");
        expect(select.value).toBe("option2");
    });
});
