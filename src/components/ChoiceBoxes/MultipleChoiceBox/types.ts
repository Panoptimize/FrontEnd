
export interface IMultipleChoiceBox{
    boxText?:string
    options: {value: string, label: string }[] //no puede ser undefined
    selectedOptions:  {value: string, label: string }[]
}