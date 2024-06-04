import React, { useEffect } from "react";
import { INotesRow } from "./types";
import NoteCard from "../NoteCard/NoteCard";

const NotesRow: React.FC<INotesRow> = ({ id, title, priority, updateDate, description, signalToNotesTable }) => {

  const receivedSignal = () => {
    console.log("SIGNAL RECEIVED FROM NOTECARD")
    if(signalToNotesTable){
      signalToNotesTable();
    }
  }

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
              <p>{priority}</p>
            </div>
            <p>{updateDate}</p>
            <div>
              <NoteCard
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
