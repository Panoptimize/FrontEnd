import httpInstance from "../httpInstance";
import { IPerformanceChart, IUsersChartData } from "../../components/PerformanceChart/types";
import {IGetPerformanceRequest, IPerformanceResponse } from "./types";

export const getPerformance = async (getPerformanceRequest: IGetPerformanceRequest): Promise<IPerformanceChart> => {
    const response = await httpInstance.post<IPerformanceResponse[]>('/dashboard/performance', getPerformanceRequest);
    return processData(response.data);
};

const processData = (data: IPerformanceResponse[]): IPerformanceChart => {
    const usersChartData: IUsersChartData[] = data.map((agent) => ({
        username: agent.agentName,
        data: agent.performances,
    }));

    return {
        users: usersChartData,
    };
};

export default getPerformance;
