import httpInstance from "../httpInstance";

interface TimeRange {
    endTime: string;
    startTime: string;
    type: string;
}

interface SearchContactsDTO {
    instanceId: string;
    maxResults?: number;
    nextToken?: string;
    searchCriteria?: any; // Ajusta el tipo según tus necesidades
    sort?: any; // Ajusta el tipo según tus necesidades
    timeRange: TimeRange;
}

export const getActionCenter = async (searchContactsDTO: SearchContactsDTO) => {
    try {
        const response = await httpInstance.post('contacts/search', searchContactsDTO);
        if (response.data && response.data.contacts) {
            return response.data.contacts;
        } else {
            // Devuelve datos predeterminados si la respuesta está vacía
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los contactos:", error);
        // Devuelve datos predeterminados en caso de error
        return [];
    }
};