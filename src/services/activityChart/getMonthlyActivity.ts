import httpInstance from "../httpInstance";

export const getMonthlyActivity = async () => {
    try {
        const response = await httpInstance.get(`api/total-calls/monthly-activity`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        } else {
            // Devuelve datos predeterminados si la respuesta está vacía
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    } catch (error) {
        console.error("Error al obtener la actividad mensual:", error);
        // Devuelve datos predeterminados en caso de error
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
};
