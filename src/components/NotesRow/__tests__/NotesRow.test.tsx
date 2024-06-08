import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import NotesRow from "../NotesRow";
import { INotesRow } from "../types";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("NotesRow", () => {
  const renderComponent = (props: INotesRow) =>
    render(<NotesRow {...props} data-testid="notes_row" />);

  test("Renders without crashing", () => {
    const props: INotesRow = {
    };
    renderComponent(props);
    const notesRow = screen.getByTestId("notes_row");
    expect(notesRow).toBeInTheDocument();
  });

  test("Renders with the name", () => {
    const props: INotesRow = {
      title: "Test name",
    };
    renderComponent(props);
    const notesRow = screen.getByTestId("notes_row_name");
    expect(notesRow).toHaveTextContent("Test name");
  });

  test("Formats priority correctly", () => {
    const props: INotesRow = {
      priority: "HIGH",
      signalToNotesTable: jest.fn(),
    };
    renderComponent(props);
    expect(screen.getByText("High")).toBeInTheDocument();
  });

});
