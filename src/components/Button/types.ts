import { ImageNames } from "../../assets/images/ImageNames";

import { ImageNames } from "../../assets/images/ImageNames";

export interface IButton {
    /**
     * Text of the button. It can be empty if it only requires an image.
     */
    text?: string;
    /**
     * Image of a button. The image will always go left of the text if there is any. 
     * The images should be added into this list as they're needed.
     */
    image?: string;

    /**
     * The thickness of the text of the button. 
     */
    bold?: boolean;
    /**
     * The base color of the button. The hover and click colors are predetermined.
     * More colors should be added into this list as they're needed.
     */
    baseColor: 'teal' | 'rose' | 'gray' | 'transparent' | 'mint';
    /**
     * The level of inverted value for colors of the image & text.
     * Goes from 0-100 with 0 being not inverted at all, and 100 being completely inverted.
     */
    inverted?: number;
    isSelected?: boolean;
    /**
     * Function to handle click events.
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: "button" | "submit" | "reset";
}
