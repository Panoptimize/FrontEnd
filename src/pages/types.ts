import { Priority } from "../constants/Priority";

export interface ICustomerSatisfaction {
    satisfaction_levels: number[];
}

export interface ICreateNote {
    createNote: INote;
    createAgentPerformance: IAgentPerformance;
}

export interface INote {
    name: string;
    description: string;
    priority: Priority;
    solved: boolean;
}

export interface INoteData extends INote {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface IAgentPerformance {
    avgAfterContactWorkTime: number;
    avgHandleTime: number;
    avgAbandonTime: number;
    avgHoldTime: number;
}

export interface IAgentPerformanceData extends IAgentPerformance {
    id: number;
}