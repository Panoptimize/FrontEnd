export interface GetKpisRequest {
    instanceId: string;
    startDate: string;
    endDate: string;
    routingProfiles: string[];
}

export interface Activity {
    value: number;
    startTime: string;
  }
  
  export interface Metrics {
    avgHoldTime: number | null;
    firstContactResolution: number | null;
    abandonmentRate: number | null;
    serviceLevel: number | null;
    agentScheduleAdherence: number | null;
    avgSpeedOfAnswer: number | null;
  }
  
  
  export interface MetricResponse {
    metrics: Metrics;
    activities: {
      activities: Activity[];
    };
    performanceData: PerformanceData[];
    voice: number;
    chat: number;
  }
  
  export interface PerformanceData {
    agentName: string;
    performances: number[];
  }