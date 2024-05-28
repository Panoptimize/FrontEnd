import httpInstance from "../httpInstance";
import { IPerformanceChart, IUsersChartData } from "../../components/PerformanceChart/types";

export const getPerformance = async (): Promise<IPerformanceChart> => {
    const requestPayload = {
        instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
        startDate: "2024-05-10",
        endDate: "2024-05-26",
        routingProfiles: ["4896ae34-a93e-41bc-8231-bf189e7628b1"],
        queues: []
    };

    const response = await httpInstance.post<IPerformanceResponse[]>('/dashboard/performance', requestPayload);
    return processData(response.data);
};

const processData = (data: IPerformanceResponse[]): IPerformanceChart => {
    const usersChartData: IUsersChartData[] = data.map((agent) => ({
        username: agent.agentID,
        data: agent.performances,
    }));

    return {
        users: usersChartData,
    };
};

export default getPerformance;


interface IPerformanceResponse {
    performances: number[];
    agentID: string;
}


