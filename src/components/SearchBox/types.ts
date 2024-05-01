export interface SearchBoxProps {
    /**
     * The hint that will be displayed in the search box.
     */
    hint?: string
    /**
     * The function that will be called when the user clicks enter or the search icon.
     * 
     * @param searchTerm The term that the user is searching for.
     * @returns void
     */
    handleSearch: (searchTerm: string) => void
}