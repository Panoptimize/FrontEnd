export interface IAgentCard {
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
   workspace?:string;
   id:string;
   call_time?:string;
   after_time?:string;
   hold_time?:string;
   abandon_time?:string;
}


export interface INotesRow {
    id? : string;
    title?: string;
    priority?: 'low' | 'medium' | 'high';
    updateDate?: string; 
    description?: string;
}