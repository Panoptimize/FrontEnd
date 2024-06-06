import { Priority } from "../../../constants/Priority";

export interface IChoiceBox{
    /**
     * The text to display in the ChoiceBox
     */
    boxText?:string
    options: Option[] //no puede ser undefined
    chosen?: any
}

export interface ChoiceBoxRef{
    getValue: () => Priority;
}


export interface Option {
    /**
     * The value to set as the selected option
     */
    value: string
    /**
     * The label to display for the selected option
     */
    label: string
}