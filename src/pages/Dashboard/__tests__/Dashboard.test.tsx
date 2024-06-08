import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Dashboard from "../Dashboard"
import { useAppContext } from "../../../store/app-context/app-context";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { StatusCardHolder } from "../../../components/StatusCardHolder";
import { MultipleChoiceBox } from "../../../components/ChoiceBoxes/MultipleChoiceBox";
import { Option } from "../../../components/ChoiceBoxes/ChoiceBox/types";

beforeEach(() => {
    cleanup();
});

jest.mock("../../../components/StatusCardHolder", () => ({
    StatusCardHolder: () => <div data-testid="StatusCardHolder">Overall Performance</div>,
  }));


jest.mock("../../../components/Button", ()=>({
    Button: ({baseColor} :{baseColor: string}, {text}: {text: string}) => <div data-testid="Button">{text}</div>
}));

describe("Dashboard page", () => {
    test("Renders the dashboard no crash", () => {
        render(
            <div>
                <Dashboard />
            </div>
        );
        expect(screen.getByTestId("StatusCardHolder")).toHaveTextContent("Overall Performance");
        expect(screen.getByTestId("Button")).toHaveTextContent("Download");
        expect(screen.getByText("Agents Status")).toBeInTheDocument();
        expect(screen.getByText("Filters:")).toBeInTheDocument();
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    })
    })