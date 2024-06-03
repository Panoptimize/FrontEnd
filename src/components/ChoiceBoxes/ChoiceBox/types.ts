
export interface IChoiceBox{
    /**
     * The text to display in the ChoiceBox
     */
    boxText?:string
    /**
     * The options to display in the ChoiceBox
     */
    title?:string

    /**
     * 
     * @param value The value to set as the selected option
     * @param label The label to display for the selected option
     * @returns void
     */
    options: Option[] 
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