import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import NotesTable from "../NotesTable";
import { INotesTable } from "../types";
import { INoteData } from "../../../pages/types";
import { Priority } from "../../../constants/Priority";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("NotesTable", () => {
  const renderComponent = (props: INotesTable) =>
    render(<NotesTable {...props} data-testid="notes_table" />);

    const mockNotesData: INoteData[] = [
    {
      id: 1,
      name: "Test Note 1",
      description: "Description for Test Note 1",
      priority: Priority.HIGH,
      solved: false,
      createdAt: "2023-05-01T12:34:56.789Z",
      updatedAt: "2024-05-01T12:34:56.789Z",
    },
    {
      id: 2,
      name: "Test Note 2",
      description: "Description for Test Note 2",
      priority: Priority.MEDIUM,
      solved: false,
      createdAt: "2023-05-02T12:34:56.789Z",
      updatedAt: "2024-05-02T12:34:56.789Z",
    },
  ];

  test("Renders without crashing", () => {
    const props: INotesTable = {
        notesData: mockNotesData
    };
    renderComponent(props);
    const notesTable = screen.getByTestId("notes_table");
    expect(notesTable).toBeInTheDocument();
  });

  test("Renders data correctly", () => {
    const props: INotesTable = {
        notesData: mockNotesData
    };
    renderComponent(props);
    const notesTableRows = screen.getAllByTestId("notes_row");
    expect(notesTableRows).toHaveLength(mockNotesData.length);
  })

  test("Sorts by title", () => {
    const props: INotesTable = {
        notesData: mockNotesData
    }
    renderComponent(props);
    const titleHeader = screen.getByText("Title");
    fireEvent.click(titleHeader);
    const noteRows = screen.getAllByTestId("notes_row_name");
    expect(noteRows[0]).toHaveTextContent("Test Note 1");
    fireEvent.click(titleHeader);
    expect(noteRows[0]).toHaveTextContent("Test Note 2");
  });

  test("Sorts by priority", () => {
    const props: INotesTable = {
      notesData: mockNotesData
    }
    renderComponent(props);
    const priorityHeader = screen.getByText("Priority");
    fireEvent.click(priorityHeader);
    const noteRows = screen.getAllByText(/High|Medium|Low/);
    expect(noteRows[0]).toHaveTextContent("High");
  });

  test("Sorts by last update", () => {
    const props: INotesTable = {
      notesData: mockNotesData
  }
    renderComponent(props);
    const updateHeader = screen.getByText("Last Update");
    fireEvent.click(updateHeader);
    const noteRows = screen.getAllByTestId("notes_row");
    expect(noteRows[0]).toHaveTextContent("01/05/2024");
    fireEvent.click(updateHeader);
    expect(noteRows[0]).toHaveTextContent("02/05/2024");
  });

});
