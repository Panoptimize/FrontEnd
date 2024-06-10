import httpInstance from "../httpInstance";

export const getAgentMetrics = async (agentId: number) => {
    let res: any;
    const endpoint = `/agent-performance/details/${agentId}`;
    await httpInstance.get(endpoint).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    console.log(res);
    return res;
};
