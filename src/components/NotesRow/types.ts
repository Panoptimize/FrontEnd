export interface INotesRow {
    id? : number;
    title?: string;
    priority?: 'Low' | 'Medium' | 'High';
    updateDate?: string; 
    description?: string;
}