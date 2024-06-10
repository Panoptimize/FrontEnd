import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PasswordReset from "../PasswordReset";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

beforeEach(() => {
    cleanup();
});

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
}));

describe("PasswordReset component", () => {
    test("Renders PasswordReset component", () => {
        render(
            <MemoryRouter>
                <PasswordReset />
            </MemoryRouter>
        );

        expect(screen.getByText("Password Reset")).toBeInTheDocument();
        expect(screen.getByTestId("email-label")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Send reset email/i })).toBeInTheDocument();
    });

    test("Renders email input change", () => {
        render(
            <MemoryRouter>
                <PasswordReset />
            </MemoryRouter>
        );

        const emailInput = screen.getByTestId("email-input");
        fireEvent.change(emailInput, { target: { value: "a01662659@tec.mx" } });

        expect(emailInput).toHaveValue("a01662659@tec.mx");
    });

    test("Handles successful password reset", async () => {
        (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce({});
    
        render(
          <MemoryRouter>
            <PasswordReset />
          </MemoryRouter>
        );
    
        const emailInput = screen.getByTestId("email-input");
        const submitButton = screen.getByRole("button", { name: /Send reset email/i });
    
        fireEvent.change(emailInput, { target: { value: "a01662659@tec.mx" } });
        fireEvent.click(submitButton);
    
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), "a01662659@tec.mx");
        await screen.findByText("Password reset email sent! Check your inbox");
      });

      test("Handles error during password reset", async () => {
        const errorMessage = "Failed to send email";
        (sendPasswordResetEmail as jest.Mock).mockRejectedValueOnce(new Error("Failed to send email"));

        console.log = jest.fn();

        render(
            <MemoryRouter>
                <PasswordReset />
            </MemoryRouter>
        );

        const emailInput = screen.getByTestId("email-input")
        const submitButton = screen.getByRole("button", { name: /Send reset email/i });

        fireEvent.change(emailInput, {target: { value: "fake@com" }});
        fireEvent.click(submitButton);

        expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), "fake@com");
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });

        expect(console.log).toHaveBeenCalledWith(errorMessage);
      });
});