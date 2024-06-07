import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import Login from "../Login"
import { useAppContext } from "../../../store/app-context/app-context";
import { MemoryRouter, useNavigate } from "react-router-dom";

beforeEach(() => {
    cleanup();
});

jest.mock("../../../store/app-context/app-context", () => ({
    useAppContext: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn()
}));

const mockNavigate = jest.fn();

describe("Login component", () => {
    beforeEach(() => {
        (useAppContext as jest.Mock).mockReturnValue({
            login: jest.fn(),   
        });
        (require("react-router-dom").useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    test("Renders login form", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByLabelText("Password:")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    })

    test("Handles input changes", () => {
        render(
            <MemoryRouter   >
                <Login />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText("Email:")
        const passwordInput = screen.getByLabelText("Password:")

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("password123");
    });
})