import { INotesRow, INotesTable } from './../../components/NotesTable/types';
import httpInstance from "../httpInstance";
import { INoteData, INote } from "../../pages/types";
import { NotesTable } from '../../components/NotesTable';

export const getAgentNotes = async (agentId: number) => {
    let res: any;
    const endpoint = `/note/agent/${agentId}`;
    await httpInstance.get(endpoint).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    
    return res;
};
