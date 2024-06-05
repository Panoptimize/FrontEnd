
export interface IMultipleChoiceBox{
    boxText?:string
    options: {value: string, label: string }[] 
    selectedOptions:  {value: string, label: string }[]
}