import { cleanup, render, screen } from "@testing-library/react"
import Loading from "../Loading"

// Mock up Loader component
jest.mock("../../../components/Loader/Loader", () => ({
    __esModule: true,
    default: () => <div data-testid="loader" className="spinning"></div>
})); 

beforeEach(() => {
    cleanup();
});

describe("Loading component", () => {
    test("Renders loading component", () => {
        render(<Loading />)

        expect(screen.getByTestId("loader")).toBeInTheDocument();

    });
});