export interface INoteInputs {
    id?:number;
    priority?: 'LOW'|'MEDIUM'|'HIGH';
    title?: string;
    text?:string;
    closeWindow?: () => void;
}