import React from "react";
import {INotesRow  } from "./types";


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
                        <td className="align-middle text-center">  {/* Alineación central */}
                            <div className="flex items-center justify-center"> {/* Cambia justify-end a justify-center */}
                                <p>{priority}</p>
                            </div>
                        </td>
                        <td className="align-middle">
                            <div className="flex items-center justify-end space-x-5 mx-2">
                                <p>{updateDate}</p>
                                <button className="bg-teal-100 hover:bg-teal-600 text-teal-900 font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


export default NotesRow;