import httpInstance from "../httpInstance";
import { IPerformanceChart, IUsersChartData } from "../../components/PerformanceChart/types";

export const getDownload = async () => {
    const endpoint = 'https://localhost:8080/download/getDownload';

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error response from server:', errorResponse);
            return { message: errorResponse };
        }

        // Handling the response as a blob
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded-file.xlsx'; // Set the desired file name here
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        return { message: 'File downloaded successfully' };
    } catch (error) {
        console.error('Error while fetching data:', error);
        return { message: 'Error while fetching data' };
    }
}