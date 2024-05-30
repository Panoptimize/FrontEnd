import React from "react";
import { INotesRow } from "./types";
import NoteCard from "../NoteCard/NoteCard";

const NotesRow: React.FC<INotesRow> = ({ title, priority, updateDate }) => {
  return (
    <div>
      <table className="w-full table-auto">
        <tbody>
          <tr className="">
            <td className="align-middle">
              <div className="flex items-center">
                <p>{title}</p>
              </div>
            </td>
            <td className="align-middle">
              <div className="flex items-center justify-end space-x-5 mx-2">
                <div className="mr-7">
                  <p>{priority}</p>
                </div>
                <p>{updateDate}</p>
                <div>
                  <NoteCard image_only={true}></NoteCard>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotesRow;
