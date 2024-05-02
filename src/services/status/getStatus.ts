import httpInstance from "../httpInstance";
import { IStatusCard } from "../../components/StatusCard/types";

// Define los datos default
const defaultStatusCards: IStatusCard[] = [
    { status: 'AGENTS_AVAILABLE', numUsers: 0 },
    { status: 'AGENTS_ON_CONTACT', numUsers: 0 },
    { status: 'AGENTS_AFTER_CONTACT_WORK', numUsers: 0 },
    { status: 'AGENTS_ONLINE', numUsers: 0 },
];

// Modifica la función getStatus
export const getStatus = async () => {
    try {
        const response = await httpInstance.get(`status`);
        const processedData = processMetrics(response.data);
        // Si los datos procesados están vacíos, devuelve datos por defecto.
        return processedData.length > 0 ? processedData : defaultStatusCards;
    } catch (err) {
        console.error("Error al obtener el estado:", err);
        // Devuelve los datos por defecto en caso de error.
        return defaultStatusCards;
    }
};


const processMetrics = (data: MetricData): IStatusCard[] => {
    console.log("Datos recibidos en processMetrics:", data);
    if (data && data.MetricResults && data.MetricResults.length > 0) {
        const result = data.MetricResults[0].Collections.map(item => ({
            status: item.Metric.Name,  
            numUsers: item.Metric.Value
        }));
        console.log("Datos procesados en processMetrics:", result);
        return result;
    } else {
        console.log("Retornando datos default desde processMetrics");
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