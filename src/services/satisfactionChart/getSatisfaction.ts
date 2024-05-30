import httpInstance from "../httpInstance";

export const getSatisfaction = async () => {
    /*
    try {
        const endpoint = '/customer-satisfaction';
        const response = await httpInstance.get(endpoint);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        } else {
            // Devuelve datos predeterminados si la respuesta está vacía
            return [1, 1, 1, 1, 1];
        }
    } catch (error) {
        console.error("Error al obtener la satisfacción del cliente:", error);
        // Devuelve datos predeterminados en caso de error
        return [1, 1, 1, 1, 1];
    }
    */
    let res: any;
    const endpoint = '/customer-satisfaction';
    await httpInstance.get(endpoint).then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    
    return res;
};
