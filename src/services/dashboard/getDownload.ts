import httpInstance from "../httpInstance";

interface DownloadDTO {
    startDate: string;
    endDate: string;
    routingProfiles: string[];
    queues: string[];
  }

export const getDownload = async (sDate: string, eDate: string, workspace: string[]) => {
    const endpoint = '/download/getDownload/7c78bd60-4a9f-40e5-b461-b7a0dfaad848';
    const date = new Date();

    const downloadDTO: DownloadDTO = {
        startDate: sDate,
        endDate: eDate,
        routingProfiles: workspace,
        queues: [],
    };

    try {
        const response = await httpInstance.post(endpoint, downloadDTO, { responseType: 'blob' });
   
        if (response.data) {
            
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'DataReport_' + date.getTime() + '.xlsx'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.error("Error al obtener la descarga:", error);
    }
}
