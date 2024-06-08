// AgentCard.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AgentCard from './AgentCard';
import { getAgentNotes } from '../../services/notes/getAgentNotes';
import { getAgentId } from '../../services/agentsList/getAgentId';



// Mockear las funciones y servicios necesarios
jest.mock('../../services/notes/getAgentNotes', () => ({
  getAgentNotes: jest.fn().mockResolvedValue({ data: { content: [] } }),
}));

jest.mock('../../services/agentsList/getAgentId', () => ({
  getAgentId: jest.fn().mockResolvedValue({ data: { id: 123 } }),
}));

describe('AgentCard Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    // Agrega la prop 'id' con un valor arbitrario, por ejemplo "123"

    expect(getByText('Test Name')).toBeInTheDocument();
    expect(getByText('Test Workspace')).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
  
    fireEvent.click(button);
  
    const modalTitle = await findByText('Contact Details');
    expect(modalTitle).toBeInTheDocument();
  });

  it('closes modal on close button click', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
  
    fireEvent.click(button);
  
    const closeButton = await findByText('Close Button Text'); // Asegúrate de ajustar el texto del botón de cierre según tu implementación
    fireEvent.click(closeButton);
  
    expect(closeButton).not.toBeInTheDocument();
  });

  it('loads agent data correctly', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
  
    fireEvent.click(button);
  
    const agentName = await findByText('Test Name');
    const agentWorkspace = await findByText('Test Workspace');
  
    expect(agentName).toBeInTheDocument();
    expect(agentWorkspace).toBeInTheDocument();
  });

  it('loads agent notes correctly', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
  
    fireEvent.click(button);
  
    // Simula la obtención de notas del agente
  
    const note1 = await findByText('Note 1 Content');
    const note2 = await findByText('Note 2 Content');
  
    expect(note1).toBeInTheDocument();
    expect(note2).toBeInTheDocument();
  });
  
  it('renders notes only when modal is open', async () => {
    const { getByText, queryByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
  
    // Verifica que las notas no estén presentes antes de abrir el modal
    expect(queryByText('Note 1 Content')).not.toBeInTheDocument();
  
    fireEvent.click(button);
  
    // Verifica que las notas estén presentes después de abrir el modal
    expect(getByText('Note 1 Content')).toBeInTheDocument();
  });

    it('renders notes only when modal is open', async () => {
        const { getByText, queryByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
    
        // Verifica que las notas no estén presentes antes de abrir el modal
        expect(queryByText('Note 1 Content')).not.toBeInTheDocument();
    
        fireEvent.click(button);
    
        // Verifica que las notas estén presentes después de abrir el modal
        expect(getByText('Note 1 Content')).toBeInTheDocument();
    });

    it('requests agent notes when opening modal', async () => {
        const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
      
        fireEvent.click(button);
      
        // Simula la obtención de notas del agente y verifica que se llama a la función correspondiente
        expect(getAgentNotes).toHaveBeenCalledWith(123);
      }); 
          

      




      it('fetches agent notes correctly', async () => {
        const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
      
        fireEvent.click(button);
      
        // Esperar a que se resuelva la promesa de obtención del ID del agente
        await Promise.resolve();
      
        // Verificar que se llamó a la función de obtención de notas del agente con el ID correcto
        expect(getAgentNotes).toHaveBeenCalledWith(123);
      });

      it('fetches agent notes correctly', async () => {
        // Configurar el mock para que resuelva la promesa con datos simulados
        (getAgentNotes as jest.Mock).mockResolvedValueOnce({ data: { content: ['Note 1', 'Note 2'] } });
    
        const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
    
        fireEvent.click(button);
    
        // Esperar a que se resuelva la promesa
        await waitFor(() => {
          // Verificar que se llamó a la función de obtención de notas del agente con el ID correcto
          expect(getAgentNotes).toHaveBeenCalledWith(123);
          // Verificar que se establecieron correctamente los datos de las notas en el estado
          expect(getByText('Note 1')).toBeInTheDocument();
          expect(getByText('Note 2')).toBeInTheDocument();
        });
      });
    
      it('handles error when fetching agent notes', async () => {
        // Configurar el mock para que rechace la promesa con un error simulado
        (getAgentNotes as jest.Mock).mockRejectedValueOnce(new Error('Error fetching notes'));
    
        const consoleErrorSpy = jest.spyOn(console, 'error');
        consoleErrorSpy.mockImplementation(() => {}); // Evitar que se imprima el error en la consola
    
        const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
    
        fireEvent.click(button);
    
        // Esperar a que se maneje el error y se llame a console.error
        await waitFor(() => {
          expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Error fetching notes'));
        });
      });




      it('displays loading indicator while agent data is being fetched', async () => {
        const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
      
        fireEvent.click(button);
      
        // Verifica que el indicador de carga esté presente mientras se cargan los datos del agente
        expect(getByText('Loading...')).toBeInTheDocument();
      });
      
      it('displays error message when agent data fails to load', async () => {
        // Configura el mock para que falle la obtención de datos del agente
        (getAgentId as jest.Mock).mockRejectedValueOnce(new Error('Error fetching agent data'));
      
        const consoleErrorSpy = jest.spyOn(console, 'error');
        consoleErrorSpy.mockImplementation(() => {}); // Evitar que se imprima el error en la consola
      
        const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
      
        fireEvent.click(button);
      
        // Espera a que se maneje el error y muestra el mensaje de error
        await waitFor(() => {
          expect(getByText('Error: Unable to load agent data')).toBeInTheDocument();
          expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Error fetching agent data'));
        });
      });
      
      it('closes modal when "Esc" key is pressed', async () => {
        const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
        const button = getByText('View Details');
      
        fireEvent.click(button);
      
        // Simula la pulsación de la tecla "Esc"
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      
        // Verifica que el modal se haya cerrado
        await waitFor(() => {
          expect(screen.queryByText('Contact Details')).not.toBeInTheDocument();
        });
      });
      
      
});
