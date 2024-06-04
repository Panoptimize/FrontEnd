import { INoteData } from "../../pages/types";

export type SortConfig = {
    key: 'name' | 'priority' | 'updatedAt';
    direction: 'ascending' | 'descending';
  } | null;
  
export interface INotesRow {
    id? : number;
    title?: string;
    priority?: 'low' | 'medium' | 'high';
    updateDate?: string; 
    description?: string,
}
  
export interface INotesTable {
    notesData: INoteData[];
    signalToAgentCard?: () => void;
  }