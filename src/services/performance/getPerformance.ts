import { IUsersChartData, IPerformanceChart } from "../../components/PerformanceChart/types";
import httpInstance from "../httpInstance";

//DATOS DEFAULT
const performanceDefault = [
    { username: "Mariah Carey",     data: [
            21.28959565272351,
            54.693349736357995,
            63.707487633125574,
            53.864920220761164,
            53.294567353910786,
            75.92164532591352,
            63.3488489784212,
            54.94054224588983
        ] },
    { username: "Will Smith",       data: [
            21.28959565272351,
            54.693349736357995,
            63.707487633125574,
            53.864920220761164,
            53.294567353910786,
            75.92164532591352,
            63.3488489784212,
            54.94054224588983,
            49.89816044434891,
            45.826743782603984,
            32.774555209491616,
            71.04522752765659,
            67.24658431360889,
            54.79418761851176,
            34.02481690852419,
            57.12769269877885
        ] },
    { username: "Tom Cruise",       data: [
            21.28959565272351,
            54.693349736357995,
            63.707487633125574,
            53.864920220761164,
            53.294567353910786,
            75.92164532591352,
            63.3488489784212,
            54.94054224588983,
            49.89816044434891,
            45.826743782603984,
            32.774555209491616,
            71.04522752765659,
            67.24658431360889,
            54.79418761851176,
            34.02481690852419,
            57.12769269877885,
            92.36073870301352,
            62.99786537419662,
            54.86967279817256,
            83.79335219579514,
            38.16132040346896,
            37.656812215454956,
            49.01356631270775,
            56.72106334147938
        ] },
]

export const getPerformance = async () => {
    try {
        const response = await httpInstance.get(`dashboard/performance`);
        const processedData = refineMetrics(response.data);
        return processedData.length > 0 ? processedData : performanceDefault;
    } catch (err) {
        console.error("Error los datos de performance:", err);
        // Devuelve los datos por defecto en caso de error.
        return performanceDefault;
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
