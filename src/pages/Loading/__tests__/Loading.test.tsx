import { cleanup, render, screen } from "@testing-library/react"
import Loading from "../Loading"

beforeEach(() => {
    cleanup();
});

describe("Loading component", () => {
    test("Renders loading component", () => {
        render(<Loading />)

        const loadingMessage = screen.getByText("Loading...");
        const description = screen.getByText('Please wait while we load your content.');

        expect(loadingMessage).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });
});