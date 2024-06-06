import httpInstance from "../httpInstance";

export const getAgentPerformanceByNote = async (noteId: number) => {
    let res: any;
    const endpoint = `/agent-performance/note/${noteId}`;
    await httpInstance.get(endpoint).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    
    return res;
};
