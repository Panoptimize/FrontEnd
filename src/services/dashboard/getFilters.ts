import { FilterResponse } from "../../pages/Dashboard/types";
import httpInstance from "../httpInstance";

export const getFilters = async () => {
    const endpoint = "/dashboard/filters";
    try {
        const response = await httpInstance.get<FilterResponse>(endpoint);
        return response.data;
    } catch (err) {
        console.error("Error fetching filters:", err);
    }
}
