export interface IStatusCard {
    /**
     * Activity that the agents are performing
     */
    status: string;
    /**
     * Current number of agent in this activity 
     */
    numUsers : number;
    /**
     * Color coded for easier understanding
     */
    color: string;
}