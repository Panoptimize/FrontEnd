export interface IStatusCard {
    /**
     * Activity that the agents are performing, is restricted to only the activites allowed
     */
    status: 'Available' | 'In Contact' | 'After Call Work' | 'Offline';
    /**
     * Current amount of agents in this activity 
     */
    numUsers : number;
}