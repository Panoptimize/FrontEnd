import httpInstance from "../httpInstance";
import { GetKpisRequest, MetricResponse } from "./types";

export const getKpis = async (getKpisRequest: GetKpisRequest) => {
  return await httpInstance.post<MetricResponse>(`dashboard/metrics`, getKpisRequest);
} 

export default getKpis;
  