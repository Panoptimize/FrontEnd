import { Option } from "../ChoiceBoxes/ChoiceBox/types";

export interface SelectorListProps {
    /**
     * List of items to be displayed
     */
    items: Option[];
    /**
     * List of selected items
     */
    selected: Option[];
    /**
     * Function to be called when the selected items change
     */
    setSelected: (selected: Option[]) => void;
}