export interface ICallData{
    contactId: string;
    agent: string;
    time: string;
    duration: string;
    status: string;
    satisfaction: string;
}

export interface ICallHistory{
    history: ICallData[];
}