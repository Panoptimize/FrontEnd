import React from "react";
import { INotesRow } from "./types";
import NoteCard from "../NoteCard/NoteCard";

const NotesRow: React.FC<INotesRow> = ({ id, name, area, title, priority, updateDate, description, signalToNotesTable }) => {

  const receivedSignal = () => {
    if(signalToNotesTable){
      signalToNotesTable();
    }
  }

  const formatPriority = (priority: string | undefined): string => {
    switch (priority) {
      case "HIGH":
        return "High";
      case "MEDIUM":
        return "Medium";
      case "LOW":
        return "Low";
      default:
        return "";
    }
  };

  return (
    <div>
      <table className="w-full table-auto">
        <td className="align-middle w-full">
          <div className="flex items-center w-full mr-2 overflow-x-clip">
            <p>{title}</p>
          </div>
        </td>
        <td className="align-middle flex flex-auto">
          <div className="flex flex-auto items-center justify-end space-x-5 mx-2 text-nowrap">
            <div className="mr-7">
              <p>{formatPriority(priority)}</p>
            </div>
            <p>{updateDate}</p>
            <div>
              <NoteCard
                name={name}
                area={area}
                bttn_color="transparent"
                bttnTitle="Edit"
                id={id}
                title={title}
                text={description}
                priority={priority}
                signalNotesRow={receivedSignal}
              ></NoteCard>
            </div>
          </div>
        </td>
      </table>
    </div>
  );
};

export default NotesRow;
