import React, { useState, useMemo } from "react";
import NotesRow from "../NotesRow/NotesRow";
import { SortConfig, INotesTable } from "./types";

const NotesTable: React.FC<INotesTable> = ({ notesData }) => {
  const [notes, setNotes] = useState(notesData);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

   //Order for the sort methods to order priority from low to high and vicecersa. 
   const priorityOrder: Record<'Low' | 'Medium' | 'High', number> = {
    Low: 1,
    Medium: 2,
    High: 3
  };
 

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

      if (sortConfig.key === 'priority') {
        return sortConfig.direction === 'ascending' 
          ? priorityOrder[aValue as 'Low' | 'Medium' | 'High'] - priorityOrder[bValue as 'Low' | 'Medium' | 'High']
          : priorityOrder[bValue as 'Low' | 'Medium' | 'High'] - priorityOrder[aValue as 'Low' | 'Medium' | 'High'];
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
  }, [notes, sortConfig]);

  const requestSort = (key: "title" | "priority" | "updateDate") => {
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
    <div className="flex flex-auto flex-col">
      <div className="flex flex-row items-center justify-between pr-3">
        <h1
          className="ml-2 font-bold cursor-pointer hover:underline"
          onClick={() => requestSort("title")}
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
            onClick={() => requestSort("updateDate")}
          >
            Last Update
          </h1>
        </div>
      </div>
      <div className="overflow-y-scroll p-2 flex-auto h-64 rounded-md border-2 my-2">
        {sortedNotes.map((note, index) => (
          <NotesRow
            key={index}
            title={note.title}
            priority={note.priority}
            updateDate={note.updateDate}
            description={note.description}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesTable;