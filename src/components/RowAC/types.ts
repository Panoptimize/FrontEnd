export interface IRowAC {
    /**
     * Current time counter
     */
    currentTime?: string;

    /**
     * Date of the call status update
     */
    date?: string;

    /**
     * Time of the call status update
     */
    initiationHour?: string;

    /**
     * Image of the agent
     */
    agentImage: string;

    /**
     * Name of the agent
     */
    name?: string;

    /**
     * Status of the agent
     */
    status: string;

    /**
     * Agent identifier
     */
    agentId: string;  // Nuevo atributo para identificador del agente

    /**
     * Temperature level of the interaction
     */
    temperature?: string;

    /**
     * Type of channel of the interaction
     */
    channel: string;
}
