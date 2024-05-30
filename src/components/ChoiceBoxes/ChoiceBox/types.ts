
export interface IChoiceBox{
    boxText?:string
    options: {value: string, label: string }[] //no puede ser undefined
    chosen?: string
}