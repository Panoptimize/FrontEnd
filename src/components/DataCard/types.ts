export interface IDataCard {
    /**
     * Title of the information
     */
    title: string;
    /**
     * Value of the information
     */
    content: string | number;

    /**
     * Value decorator
     */
    decorator?: string;
}
