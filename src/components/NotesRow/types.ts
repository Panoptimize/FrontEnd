export interface INotesRow {
    id? : number;
    title?: string;
    priority?: 'low' | 'medium' | 'high';
    updateDate?: string; 
    description?: string;
}