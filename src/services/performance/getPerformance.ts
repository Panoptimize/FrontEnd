import { IUsersChartData, IPerformanceChart } from "../../components/PerformanceChart/types";
import httpInstance from "../httpInstance";

export const getPerformance = async () => {
    try {
        const responseData = await httpInstance.post<IUsersChartResult, any>('dashboard/performance', {
            // Request parameters...
            instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
            startDate: "2024-05-11",
            endDate: "2024-05-14",
            routingProfiles: ["4896ae34-a93e-41bc-8231-bf189e7628b1"],
            queues: []
        });
        const processedData = processData(responseData);
        return { success: true, data: processedData };
    } catch (err) {
        return { success: false, error: "Error obtaining the performance data" };
    }
};



const processData = (data: IPerformanceData): IPerformanceChart => {
    const usersChartData: IUsersChartData[] = data.agents.map((agent) => ({
        username: agent.agentId,
        data: agent.dataResults,
    }));

    return {
        users: usersChartData,
    };
};


export default getPerformance;


interface IUsersChartResult {
    agentId: string;
    dataResults: number[];
}

interface IPerformanceData{
    agents: IUsersChartResult[]
}