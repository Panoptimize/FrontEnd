export interface IStatusCard {
    /**
     * Activity that the agents are performing, is restricted to only the activites allowed
     */
    status: 'AGENTS' | 'AGENTS_ONLINE' | 'AGENTS_AVAILABLE' | 'AGENTS_OFFLINE';

    /**
     * Current amount of agents in this activity 
     */
    numUsers : number;
    
}