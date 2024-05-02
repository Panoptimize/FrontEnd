import httpInstance from "../httpInstance";
import { IStatus } from "../../pages/Dashboard/types";

export const getStatus = async () => {
    try {
        const response = await httpInstance.get(`status`);
        const processedData = processMetrics(response.data);
        return { data: processedData, error: null };
    } catch (err) {
        return { data: [], error: (err as any).response || { message: 'An unknown error occurred' } };
    }
}

const processMetrics = (data: MetricData): IStatus[] => {
    if (data && data.MetricResults && data.MetricResults.length > 0) {
        return data.MetricResults[0].Collections.map(item => ({
            status: item.Metric.Name,  
            numUsers: item.Metric.Value
        }));
    } else {
        return [];  
    }
}

export default getStatus;

interface MetricResult {
    Metric: {
        Name: 'AGENTS_AVAILABLE' | 'AGENTS_ON_CONTACT' | 'AGENTS_AFTER_CONTACT_WORK' | 'AGENTS_ONLINE';
        Value: number;
    };
}

interface MetricData {
    MetricResults: Array<{
        Collections: MetricResult[];
    }>;
}
