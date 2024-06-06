export interface IUsersChartData {
    username: string;
    data: number[];
}

export interface IPerformanceChart {
    users: IUsersChartData[]; 
  }