export type SortConfig = {
    key: 'title' | 'priority' | 'updateDate';
    direction: 'ascending' | 'descending';
  } | null;
  
export interface INotesRow {
    id? : number;
    title?: string;
    priority?: string;
    updateDate?: string; 
}
  
export interface INotesTable {
    notesData: INotesRow[];
  }