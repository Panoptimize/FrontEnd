import { Option } from "../ChoiceBox/types";

export interface IMultipleChoiceBox{
    options: Option[]
    selectedOptions: Option[]
    setSelectedOptions: (options: Option[]) => void
}