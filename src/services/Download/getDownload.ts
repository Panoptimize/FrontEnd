import httpInstance from "../httpInstance";
import { IPerformanceChart, IUsersChartData } from "../../components/PerformanceChart/types";

export const getDownload = async () => {
    const endpoint = '/download/getDownload';

    try {
        const response = await httpInstance.get(endpoint);
        if (response.data) {
            console.log("gg")
            return response.data;
        }
    } catch (error) {
        console.error("Error al obtener la descarga:", error);
        // Devuelve datos predeterminados en caso de error
    }
}

/*
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
*/ 