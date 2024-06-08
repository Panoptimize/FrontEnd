import { screen, render, cleanup } from "@testing-library/react";
import React from "react";
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

    test("Selects the default option correctly", () => {
        renderComponent(props);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe("option1");
    });

    test("Changes selection correctly", async () => {
        renderComponent(props);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        await userEvent.selectOptions(select, "option2");
        expect(select.value).toBe("option2");
    });

    test("Calls getValue correctly", async () => { // Get value is used by priority for the notes.
        const ref = React.createRef<ChoiceBoxRef>();
        render(
            <table>
                <tbody>
                    <ChoiceBox {...props} ref={ref}></ChoiceBox>
                </tbody>
            </table>
        );
        expect(ref.current?.getValue()).toBe("option1");
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        await userEvent.selectOptions(select, "option2");
        expect(ref.current?.getValue()).toBe("option2");
    });

    test("Renders correctly with different chosen prop", () => {
        const newProps = { ...props, chosen: "option2" };
        renderComponent(newProps);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe("option2");
    });

    test("Renders with chosen value not in options by defaulting to the first option", () => {
        const newProps = { ...props, chosen: "nonexistent" };
        renderComponent(newProps);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe(props.options[0].value); // Defaults to the first option
    });

    test("Is accessible via keyboard", async () => {
        renderComponent(props);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        select.focus();
        await userEvent.keyboard('{arrowdown}');
        expect(select.value).toBe('option2');
        await userEvent.keyboard('{arrowdown}');
        expect(select.value).toBe('option3');
    });

    test("Applies correct classes", () => {
        renderComponent(props);
        const container = screen.getByText("Select your workspace").closest('div');
        expect(container).toHaveClass('flex w-30 h-8 p-1 rounded-full border border-gray-400 bg-white pl-4 pr-4');
    });
});


