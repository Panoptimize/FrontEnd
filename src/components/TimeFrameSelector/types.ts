export interface ITimeFrameSelector {
    /**
     * The start date of the interval
     */
    startDate: string;

    /**
     * 
     * @param date The date to set as the start date
     * @returns void
     */
    setStartDate: (date: string) => void;

    /**
     * The end date of the interval
     */
    endDate: string;

    /**
     * 
     * @param date The date to set as the end date
     * @returns void
     */
    setEndDate: (date: string) => void;

    /**
     * The limit of the interval in days
     */
    limit?: number;
}