export interface IUsersChartData {
    username: string;
    data: number[];
}

export interface IPerformanceChart {
    //Receive Agent Id, Agent global performance, Agent global performance trend
    users: IUsersChartData[]; // Data array
  }