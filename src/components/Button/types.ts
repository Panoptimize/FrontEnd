export interface IButton{
    /**
     * Text of the button. It can be empty if it only requires an image.
     */
    text?:string
    /**
     * Image of a button. The image will always go left of the text if there is any. 
     * The images should be added into this list as they're needed.
     */
    image?:'actionCenter'|'agents'|'dashboard'|'history'
    /**
     * The thickness of the text of the button. 
     */
    thickness?: 'normal'|'bold'
    /**
     * The base color of the button. The hover and click colors are predetermined.
     * More colors should be added into this list as they're needed.
     */
    baseColor:'teal'|'rose'|'gray'|'transparent'
}