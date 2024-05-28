export interface GetKpisRequest {
    instanceId: string;
    startDate: string;
    endDate: string;
    agents: string[];
    routingProfiles: string[];
}

export interface MetricResponse {
    /**
     * Average Hold Time KPI
     */
    avgHoldTime: number;
    /**
     * Agent Schedule Adherence KPI
     */
    firstContactResolution: number;
    /**
     * Abandonment Rate KPI
     */
    abandonmentRate: number;
    /**
     * Service Level KPI
     */
    serviceLevel: number;
    /**
     * Occupancy KPI
     */
    agentScheduleAdherence: number;
    /**
     * Average Speed Answer KPI
     */
    avgSpeedOfAnswer: number;
    /**
     * Voice contacts
     */
    voice: number;
    /**
     * Chat contacts
     */
    chat: number
    /**
     * Overall activity
     */
    activities: {
        value: number;
        startTime: string;
      }[];
}