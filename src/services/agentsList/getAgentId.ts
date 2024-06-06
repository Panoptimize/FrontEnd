import httpInstance from "../httpInstance";

export const getAgentId = async (id: string) => {
    let res: any;
    const endpoint = `/agent/connect/${id}`;
    await httpInstance.get(endpoint).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    
    return res;
};
