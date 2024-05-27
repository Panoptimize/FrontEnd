export interface IActivityData {
  value: number;
  startTime: string;  // Asumiendo que quieres mantener el formato ISO
}

export interface IActivityChart {
  data?: IActivityData[]; // Array de objetos que contienen valor y fecha
}