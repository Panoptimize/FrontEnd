import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NoteInputs from '../NoteInputs';
import { updateNote } from '../../../services/notes/updateNote';
import { deleteNote } from '../../../services/notes/deleteNote';
import { createNote } from '../../../services/notes/createNote';

jest.mock('../../../services/notes/updateNote', () => ({
  updateNote: jest.fn(),
}));

jest.mock('../../../services/notes/deleteNote', () => ({
  deleteNote: jest.fn(),
}));

jest.mock('../../../services/notes/createNote', () => ({
  createNote: jest.fn(),
}));

describe('NoteInputs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<NoteInputs />);
  });

  it('calls closeWindow when Save button is clicked', async () => {
    const closeWindowMock = jest.fn();
    const { getByText } = render(<NoteInputs closeWindow={closeWindowMock} />);
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    await waitFor(() => expect(closeWindowMock).toHaveBeenCalled());
  });

  it('sets isEmpty to true when title is empty and Save button is clicked', async () => {
    const { getByText } = render(<NoteInputs />);
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    const errorMessage = getByText('PLEASE ADD A TITLE !!!');
    expect(errorMessage).toBeInTheDocument();
  });

  it('sets isTooLong to true when title length exceeds 20 characters', async () => {
    const { getByText, getByPlaceholderText } = render(<NoteInputs />);
    const saveButton = getByText('Save');
    const titleInput = getByPlaceholderText('Add Title');
    fireEvent.change(titleInput, { target: { value: 'This title is definitely too long' } });
    fireEvent.click(saveButton);
    const errorMessage = getByText('TITLE IS TOO LONG !!!');
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls updateNote when Save button is clicked and id is provided', async () => {
    const closeWindowMock = jest.fn();
    (updateNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = render(<NoteInputs id={1} closeWindow={closeWindowMock} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(updateNote).toHaveBeenCalledWith(expect.any(Object), 1));
    await waitFor(() => expect(closeWindowMock).toHaveBeenCalled());
  });

  it('sets isEmpty to true when name is empty in editNote function', async () => {
    const closeWindowMock = jest.fn();
    const { getByText } = render(<NoteInputs id={1} closeWindow={closeWindowMock} />);
    fireEvent.click(getByText('Save'));
    await waitFor(() => {
      const errorMessage = getByText('PLEASE ADD A TITLE !!!');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('logs "NO CLOSE WINDOW" when closeWindow is not provided in editNote function', async () => {
    console.log = jest.fn();
    (updateNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = render(<NoteInputs id={1} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(updateNote).toHaveBeenCalled());
    expect(console.log).toHaveBeenCalledWith('NO CLOSE WINDOW');
  });

  it('calls deleteNote when Delete button is clicked', async () => {
    (deleteNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = render(<NoteInputs id={1} />);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    await waitFor(() => expect(deleteNote).toHaveBeenCalledWith(1));
  });

  it('logs "NOTE DELETED" when deleteNote is called successfully', async () => {
    console.log = jest.fn();
    (deleteNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = render(<NoteInputs id={1} />);
    fireEvent.click(getByText('Delete'));
    await waitFor(() => expect(deleteNote).toHaveBeenCalled());
    expect(console.log).toHaveBeenCalledWith('NOTE DELETED');
  });

  it('calls closeWindow when deleteNote is called successfully and closeWindow is provided', async () => {
    const closeWindowMock = jest.fn();
    (deleteNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = render(<NoteInputs id={1} closeWindow={closeWindowMock} />);
    fireEvent.click(getByText('Delete'));
    await waitFor(() => expect(deleteNote).toHaveBeenCalled());
    expect(closeWindowMock).toHaveBeenCalled();
  });

  it('calls createNote when Save button is clicked and id is not provided', async () => {
    const closeWindowMock = jest.fn();
    (createNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = render(<NoteInputs closeWindow={closeWindowMock} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Add Text'), { target: { value: 'Test Description' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(createNote).toHaveBeenCalled());
    await waitFor(() => expect(closeWindowMock).toHaveBeenCalled());
  });

  it('sets isEmpty to true when title is empty in creatingNote function', async () => {
    const { getByText, getByPlaceholderText } = render(<NoteInputs />);
    fireEvent.click(getByText('Save'));
    const errorMessage = getByText('PLEASE ADD A TITLE !!!');
    expect(errorMessage).toBeInTheDocument();
  });

  it('sets isTooLong to true when title length exceeds 20 characters in creatingNote function', async () => {
    const { getByText, getByPlaceholderText } = render(<NoteInputs />);
    const saveButton = getByText('Save');
    const titleInput = getByPlaceholderText('Add Title');
    fireEvent.change(titleInput, { target: { value: 'This title is definitely too long' } });
    fireEvent.click(saveButton);
    const errorMessage = getByText('TITLE IS TOO LONG !!!');
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls createNote when metrics and agentId are provided', async () => {
    const closeWindowMock = jest.fn();
    const metrics = {
      avgAfterContactWorkTime: 1,
      avgHandleTime: 2,
      avgAbandonTime: 3,
      avgHoldTime: 4
    };
    const agentId = 1;
    (createNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = render(<NoteInputs closeWindow={closeWindowMock} metrics={metrics} agentId={agentId} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Add Text'), { target: { value: 'Test Description' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(createNote).toHaveBeenCalled());
    await waitFor(() => expect(closeWindowMock).toHaveBeenCalled());
  });

  it('logs error when updateNote throws an error', async () => {
    console.error = jest.fn();
    (updateNote as jest.Mock).mockRejectedValueOnce(new Error('Update failed'));
    const { getByText, getByPlaceholderText } = render(<NoteInputs id={1} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(updateNote).toHaveBeenCalled());
    await waitFor(() => expect(console.error).toHaveBeenCalledWith(new Error('Update failed')));
  });

  it('logs error when deleteNote throws an error', async () => {
    console.error = jest.fn();
    (deleteNote as jest.Mock).mockRejectedValueOnce(new Error('Delete failed'));
    const { getByText } = render(<NoteInputs id={1} />);
    fireEvent.click(getByText('Delete'));
    await waitFor(() => expect(deleteNote).toHaveBeenCalled());
    await waitFor(() => expect(console.error).toHaveBeenCalledWith(new Error('Delete failed')));
  });

  it('logs error when createNote throws an error', async () => {
    console.error = jest.fn();
    (createNote as jest.Mock).mockRejectedValueOnce(new Error('Create failed'));
    const metrics = {
      avgAfterContactWorkTime: 1,
      avgHandleTime: 2,
      avgAbandonTime: 3,
      avgHoldTime: 4
    };
    const agentId = 1;
    const { getByText, getByPlaceholderText } = render(<NoteInputs metrics={metrics} agentId={agentId} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Add Text'), { target: { value: 'Test Description' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(createNote).toHaveBeenCalled());
    await waitFor(() => expect(console.error).toHaveBeenCalledWith(new Error('Create failed')));
  });

  it('sets priority to LOW if not provided', async () => {
    const closeWindowMock = jest.fn();
    const metrics = {
      avgAfterContactWorkTime: 1,
      avgHandleTime: 2,
      avgAbandonTime: 3,
      avgHoldTime: 4
    };
    const agentId = 1;
    (createNote as jest.Mock).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = render(<NoteInputs closeWindow={closeWindowMock} metrics={metrics} agentId={agentId} />);
    fireEvent.change(getByPlaceholderText('Add Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Add Text'), { target: { value: 'Test Description' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => {
      expect(createNote).toHaveBeenCalledWith(expect.objectContaining({
        createNote: expect.objectContaining({
          priority: 'LOW'
        })
      }));
    });
    await waitFor(() => expect(closeWindowMock).toHaveBeenCalled());
  });
});
