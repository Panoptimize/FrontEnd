export interface IStatus {
    /**
     * Activity that the agents are performing, is restricted to only the activites allowed
     */
    status: 'AGENTS_AVAILABLE' | 'AGENTS_ON_CONTACT' | 'AGENTS_AFTER_CONTACT_WORK' | 'AGENTS_ONLINE';
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