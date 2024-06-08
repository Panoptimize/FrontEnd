import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
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

        fireEvent.change(emailInput, { target: { value: "a01656828@tec.mx" } });
        fireEvent.change(passwordInput, { target: { value: "ernesto-561" } });

        expect(emailInput).toHaveValue("a01656828@tec.mx");
        expect(passwordInput).toHaveValue("ernesto-561");
    });

    test("Submits form with valid credentials", async () => {
        const mockLogin = jest.fn().mockResolvedValue({});
        (useAppContext as jest.Mock).mockReturnValue({
            login: mockLogin,
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "a01656828@tec.mx" } });
        fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "ernesto-561" } });

        fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("a01656828@tec.mx", "ernesto-561");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test("Shows error with invalid credentials", async () => {
        const error = "Invalid credentials";
        const mockLogin = jest.fn().mockRejectedValue(new Error(error));
        (useAppContext as jest.Mock).mockReturnValue({
            login: mockLogin,
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "a01656828@tec.mx" } });
        fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "ernesto-561" } });

        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
        
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("a01656828@tec.mx", "ernesto-561");
            expect(screen.getByText(error)).toBeInTheDocument();
        });
    });
});