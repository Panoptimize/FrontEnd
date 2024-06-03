import httpInstance from "../httpInstance";
import { INote } from "../../pages/types";

export const updateNote = async (note: INote, noteId: number) => {
    let res: any;
    const endpoint = `/note/${noteId}`;
    await httpInstance.put(endpoint, note).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    return res;
};
