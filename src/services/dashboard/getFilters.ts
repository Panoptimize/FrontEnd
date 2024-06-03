import { FilterResponse } from "../../pages/Dashboard/types"
import httpInstance from "../httpInstance"


export const getFilters = async () => {
    const endpoint = "/dashboard/filters/" + "7c78bd60-4a9f-40e5-b461-b7a0dfaad848"
    try {
        const response = await httpInstance.get<FilterResponse>(endpoint)
        return response.data
    } catch (err) {
        console.error("Error fetching filters:", err)
    }
}