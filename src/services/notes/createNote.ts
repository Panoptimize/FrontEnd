import httpInstance from "../httpInstance";
import { INote } from "../../pages/types";

export const createNote = async (note: INote) => {
    let res: any;
    const endpoint = "/note";
    await httpInstance.post(endpoint, note).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    return res;
};
