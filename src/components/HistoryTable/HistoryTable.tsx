import React from "react";
import { ICallData, ICallHistory } from "./types";
import { HistoryTable } from ".";


const HistoryTable: React.FC <ICallHistory> = ({history}) => {
    return (
        <div>
            <table>
                <tr>
                    <th> </th>
                </tr>
            </table>
        </div>
    );
};