import httpInstance from "../httpInstance";

interface DownloadDTO {
    instanceId: string;
    startDate: string;
    endDate: string;
    routingProfiles: string[];
    queues: string[];
    agents: string[];
  }
export const getDownload = async () => {
    const endpoint = '/download/getDownload';
    const date = new Date();
    const downloadDTO: DownloadDTO = {
        instanceId: '7c78bd60-4a9f-40e5-b461-b7a0dfaad848',
        startDate: '2024-05-01',
        endDate: '2024-05-31',
        routingProfiles: ['4896ae34-a93e-41bc-8231-bf189e7628b1'],
        queues: [],
        agents: []
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
