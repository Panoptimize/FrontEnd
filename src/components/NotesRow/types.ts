export interface INotesRow {
    name?: string;
    id? : number;
    area?: string;
    title?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    updateDate?: string; 
    description?: string;
    signalToNotesTable?: () => void;
}