import { Priority } from "../../../constants/Priority";

export interface IChoiceBox{
    boxText?:string
    options: {value: string, label: string }[] //no puede ser undefined
    chosen?: any
}

export interface ChoiceBoxRef{
    getValue: () => Priority;
}