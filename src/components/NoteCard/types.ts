export interface INoteCard {
    /**
     * Title of the user information card
     */
    bttnTitle?: string;
    /**
     * Title of the user information card
     */
    title?: string;
    /**
     * User's name
     */
    name?: string;
    /**
     * User's email address
     */
    email?: string;
    /**
     * User's username
     */
    username?: string;
    /**
     * Path to the user's profile image
     */
    profileImage?: string;
    /**
     * Array of names of workspaces selected by the user (optional)
     */
    selectedWorkspaces?: string[]; 
    /**
     * Array of names of workspaces available to the user
     */
    availableWorkspaces?: string[]; 

    bttn_color?: 'teal' | 'rose' | 'gray' | 'transparent' | 'mint';
    text?: string;
    priority?: 'Low'|'Medium'|'High';
}