export interface INoteInputs {
    id?:number;
    priority?: 'low'|'medium'|'high';
    title?: string;
    text?:string;
    closeWindow?: () => void;
}