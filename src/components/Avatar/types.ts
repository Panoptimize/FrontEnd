export interface IAvatar {
    /**
     * Image of the agent(default or custom)
     */
    profile_img: string
    /**
     * State of the agent (only in the dashboard image)
     */
    state: boolean
    /**
     * Color of the state of the agent
     */
    state_color: string
    /**
     * Size of the image (large or small)
     */
    size: string
    /**
     * Type of border of the image (square or round)
     */
    square_border: boolean
}