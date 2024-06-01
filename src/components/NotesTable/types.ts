export type SortConfig = {
    key: 'title' | 'priority' | 'updateDate';
    direction: 'ascending' | 'descending';
  } | null;
  
export interface INotesRow {
    id? : number;
    title?: string;
    priority?: 'Low' | 'Medium' | 'High';
    updateDate?: string; 
    description?: string,
}
  
export interface INotesTable {
    notesData: INotesRow[];
  }