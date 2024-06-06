import { IAgentPerformance } from "../../pages/types";

export interface INoteInputs {
    id?:number;
    agentId?:number;
    metrics?:IAgentPerformance;
    priority?: 'LOW'|'MEDIUM'|'HIGH';
    title?: string;
    text?:string;
    closeWindow?: () => void;
}