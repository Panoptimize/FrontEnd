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
    avg_after_contact_work_time: number;
    avg_handle_time: number;
    avg_abandon_time: number;
    avg_hold_time: number;
    agent_id: number;
}