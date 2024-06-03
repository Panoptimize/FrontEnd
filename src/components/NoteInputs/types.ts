export interface INoteInputs {
    id?:number;
    priority?: 'low'|'medium'|'high';
    title?: string;
    text?:string;
    ref?:TextInputRef;
}

export interface TextInputRef {
    getValue: () => string;
}