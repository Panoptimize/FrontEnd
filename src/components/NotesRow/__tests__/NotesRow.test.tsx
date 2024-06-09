import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import NotesRow from "../NotesRow";
import { INotesRow } from "../types";
import { NoteCard } from "../../NoteCard";

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


  test("Renders update date correctly", () => {
    const props: INotesRow = {
      id: 1,
      name: "Test Name",
      title: "Test Title",
      priority: "HIGH",
      updateDate: "2024-06-01",
      signalToNotesTable: jest.fn(),
    };
    renderComponent(props);
    expect(screen.getByText("2024-06-01")).toBeInTheDocument();
  });

  test('Renders Low priority correctly', () => {
    var props: INotesRow = {
      priority: "LOW",
    };
    render(<NotesRow {...props} />);
    var priorityText = screen.getByText('Low');
    expect(priorityText).toBeInTheDocument();

    props = {
      priority: "MEDIUM",
    };
    render(<NotesRow {...props} />);
    priorityText = screen.getByText('Medium');
    expect(priorityText).toBeInTheDocument();

    props = {
      priority: "HIGH",
    };
    render(<NotesRow {...props} />);
    priorityText = screen.getByText('High');
    expect(priorityText).toBeInTheDocument();
  });
});
