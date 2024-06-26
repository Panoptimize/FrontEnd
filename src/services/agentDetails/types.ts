export interface IUserInfoCard {
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
    selectedWorkspaces?: string; 
    /**
     * Array of names of workspaces available to the user
     */
    availableWorkspaces?: string[]; 
    /**
     * Values to open de card
     */
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}