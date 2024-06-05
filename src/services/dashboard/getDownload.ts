import httpInstance from "../httpInstance";

export const getDownload = async () => {
    const endpoint = '/download/getDownload';
    const date = new Date();

    try {
        const response = await httpInstance.get(endpoint, { responseType: 'blob' });
        if (response.data) {
            // Create a blob from the response data
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            // Create an anchor element and set its href to the blob URL
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