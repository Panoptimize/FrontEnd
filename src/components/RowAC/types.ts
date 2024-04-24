export interface IRowAC {
    /**
     * Status of the call
     */
    callstatus: string;

    /**
     * Image of the agent
     */
    agentImage: string;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Status of the agent
     */
    status: string;

    /**
     * Workspace 1 of the agent
     */
    workspace1: string;

    /**
     * Workspace 2 of the agent
     */
    workspace2?: string;
    /**
     * Work hours of the agent
     */
    workHours: string;
    
    /**
     * Alarm status of the agent
     */
    alarm: boolean;
}