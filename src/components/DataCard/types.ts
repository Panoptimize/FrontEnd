export interface IDataCard {
    /**
     * Title of the information
     */
    title: string
    /**
     * Value of the information
     */
    content?: string | number | null;
    textColor?:'green'|'yellow'|'blue'|'red'|'purple'
    /**
     * Value decorator
     */
    decorator?: string;
}