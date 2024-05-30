import React, { useState, useMemo } from 'react';
import NotesRow from '../NotesRow/NotesRow'; 
import { SortConfig, INotesTable } from './types';




const NotesTable: React.FC<INotesTable> = ({ notesData }) => {
    const [notes, setNotes] = useState(notesData);
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);

    const sortedNotes = useMemo(() => {
        if (!sortConfig) {
          return notes;
        }
    
    let sortableNotes = [...notes];
    sortableNotes.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableNotes;
  }, [notes, sortConfig]);

    
      const requestSort = (key: 'title' | 'priority' | 'updateDate') => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        } 

        

        setSortConfig({ key, direction });
      };
    
      const resetSort = () => {
        setSortConfig(null);
      };
    
      return (
        <div className="flex flex-auto flex-col">
          <div className="flex flex-row items-center justify-between">
            <h1 className="ml-3 font-bold cursor-pointer" onClick={() => requestSort('title')}>
              Title
            </h1>
            <div className="flex flex-row space-x-10 mr-24">
              <h1 className="ml-3 font-bold cursor-pointer" onClick={() => requestSort('priority')}>
                Priority
              </h1>
              <h1 className="ml-3 font-bold cursor-pointer" onClick={() => requestSort('updateDate')}>
                Last Update
              </h1>
            </div>
          </div>
          <div className="overflow-y-scroll p-2 flex-auto h-64 rounded-md border-2 my-2">
            {sortedNotes.map((note, index) => (
              <NotesRow key={index} title={note.title} priority={note.priority} updateDate={note.updateDate} />
            ))}
          </div>
        </div>
      );
    };
    
    export default NotesTable;
    