import httpInstance from "../httpInstance";
import { IStatusCard } from "../../components/StatusCard/types";
import { IStatus } from "../../pages/Dashboard/types";

export const getStatus = async () => {
    try {
        const endpoint = "/status/"
        const response = await httpInstance.get(endpoint);
        const processedData = processMetrics(response.data);
        return { data: processedData, error: null };
    } catch (err) {
        console.error('Error fetching status:', err); 
        return { data: [], error: (err as any).response || { message: 'An unknown error occurred' } };
    }
}

const processMetrics = (data: MetricData): IStatusCard[] => {
    if (data && Array.isArray(data)) {
        return data.map(item => ({
            status: item.metricName,  
            numUsers: item.metricValue
        }));
    } else {
        return [];  
    }
}

export default getStatus;


interface MetricData {
    MetricResults: Array<{
        Collections: IStatus[];
    }>;
}
