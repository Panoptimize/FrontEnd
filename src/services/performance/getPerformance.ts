import { IUsersChartData, IPerformanceChart } from "../../components/PerformanceChart/types";
import httpInstance from "../httpInstance";

export const getPerformance = async () => {
    try {
        const response = await httpInstance.get(`dashboard/performance`);
        const processedData = refineMetrics(response.data);
        return { data: processedData, error: null };
    } catch (err) {
        return { data: [], error: (err as any).response || { message: 'An unknown error occurred' } };
    }
}

const processMetrics = (data: performanceData ): IPerformanceChart[] => {
    if (data && data.performanceResults && data.performanceResults.length > 0) {
        return data.performanceResults[0].Collections.map(item => ({
            users: [{
                username: item.Metric.Name,  
                data: item.Metric.Value
            }]
        }));
    } else {
        return [];  
    }
}

const refineMetrics = (data: performanceResult): IUsersChartData[] => {
    return [{
        username: data.Metric.Name,
        data: data.Metric.Value
    }];
}



export default getPerformance;

interface performanceResult {
    Metric: {
        Name:  "Mariah Carey" |  "Will Smith" |  "Tom Cruise";
        Value: number[];
    };
}

interface performanceData {
    performanceResults: Array<{
        Collections: performanceResult[];
    }>;
}
