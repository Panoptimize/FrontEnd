import httpInstance from "../httpInstance";

export const getMonthlyActivity = async () => {
    try {
        const response = await httpInstance.post(`dashboard/activity`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        } else {
            // Devuelve datos predeterminados si la respuesta está vacía
            return [20, 35, 28, 42, 50, 43, 50, 60, 70, 55, 30, 78];
        }
    } catch (error) {
        console.error("Error al obtener la actividad mensual:", error);
        // Devuelve datos predeterminados en caso de error
        return [20, 35, 28, 42, 50, 43, 50, 60, 70, 55, 30, 78];
    }
};
