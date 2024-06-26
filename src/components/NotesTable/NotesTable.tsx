import React, { useState, useMemo, useEffect } from "react";
import NotesRow from "../NotesRow/NotesRow";
import { SortConfig, INotesTable } from "./types";

const NotesTable: React.FC<INotesTable> = ({ name, area, notesData, signalToAgentCard }) => {

  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

   const priorityOrder: Record<'low' | 'medium' | 'high', number> = {
    low: 1,
    medium: 2,
    high: 3
  };

  const receivedSignal = () => {
    if(signalToAgentCard){
      signalToAgentCard();
    }
  }

  const sortedNotes = useMemo(() => {
    if (!sortConfig) {
      return notesData;
    }

    let sortableNotes = [...notesData];
    sortableNotes.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (sortConfig.key === 'priority') {
        return sortConfig.direction === 'ascending' 
          ? priorityOrder[aValue as 'low' | 'medium' | 'high'] - priorityOrder[bValue as 'low' | 'medium' | 'high']
          : priorityOrder[bValue as 'low' | 'medium' | 'high'] - priorityOrder[aValue as 'low' | 'medium' | 'high'];
      } else {
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }
    });
    return sortableNotes;
  }, [notesData, sortConfig]);

  const requestSort = (key: "name" | "priority" | "updatedAt") => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      setSortConfig(null); 
      return;
    }


    setSortConfig({ key, direction });
  };


  return (
    <div className="flex flex-auto flex-col" data-testid="notes_table">
      <div className="flex flex-row items-center justify-between pr-3">
        <h1
          className="ml-2 font-bold cursor-pointer hover:underline"
          onClick={() => requestSort("name")}
        >
          Title
        </h1>
        <div className="flex flex-row space-x-5 mr-24">
          <h1
            className=" font-bold cursor-pointer hover:underline"
            onClick={() => requestSort("priority")}
          >
            Priority
          </h1>
          <h1
            className="font-bold cursor-pointer hover:underline"
            onClick={() => requestSort("updatedAt")}
          >
            Last Update
          </h1>
        </div>
      </div>
      <div className="overflow-y-scroll p-2 flex-auto h-64 rounded-md border-2 my-2">
        {sortedNotes.map((note, index) =>  {
          const date = new Date(note.updatedAt);
          const formattedDate = date.toLocaleDateString('en-GB', {
            day:'2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return (
          <NotesRow
            name={name}
            area={area}
            key={index}
            id={note.id}
            title={note.name}
            priority={note.priority}
            updateDate={formattedDate}
            description={note.description}
            signalToNotesTable={receivedSignal}
            data-testid="notes_row"
          />
          );
        })}
      </div>
    </div>
  );
};

export default NotesTable;
