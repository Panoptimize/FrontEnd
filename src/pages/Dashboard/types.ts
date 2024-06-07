export interface IStatus {
    /**
     * Activity that the agents are performing, is restricted to only the activites allowed
     */
    status: 'AGENTS' | 'AGENTS_ONLINE' | 'AGENTS__AVAILABLE' | 'AGENTS_OFFLINE';
    /**
     * Current amount of agents in this activity 
     */
    numUsers : number;
}



export interface ICustomerSatisfaction {
    satisfaction_levels: number[];
}

export interface FilterResponse {
    instanceCreationDate: string;
    workspaces: AWSObject[];
}

interface AWSObject {
    id: string;
    name: string;
}

export interface IGetStatus {
    performances: number[];
    agentID: string;
}