import httpInstance from "../httpInstance";

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
