export interface ITopbar {
    /**
     * Name on the title, "Welcome {name}"
     */
    name? : string , 
    /**
     * Name of the user preview
     */
    fullName? : string , 
    /**
     * Email of the user
     */
    email? : string ,  
    /**
     * Profile picture address 
     */
    img? : string , 
    /**
     * Number of pending notifications
     */
    numberOfNotifications? : number
}