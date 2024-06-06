import httpInstance from "../httpInstance";

export const deleteNote = async (noteId: number) => {
    let res: any;
    const endpoint = `/note/${noteId}`;
    await httpInstance.delete(endpoint).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    return res;
};
