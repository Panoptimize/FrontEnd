import httpInstance from "../httpInstance";
import { IStatusCard } from "../../components/StatusCard/types";
import { IStatus } from "../../pages/Dashboard/statustype";

export const getStatus = async (instanceId: string) => {
    try {
        const response = await httpInstance.get(`status?instanceId=${instanceId}`);
        console.log('Response data:', response.data);  
        const processedData = processMetrics(response.data);
        console.log('Processed data:', processedData); 
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
