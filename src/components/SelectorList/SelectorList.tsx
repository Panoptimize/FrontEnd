import React from 'react'
import { SelectorListProps } from './types'
import { Option } from '../ChoiceBoxes/ChoiceBox/types'

const SelectorList: React.FC<SelectorListProps> = ({
    items,
    selected,
    setSelected
}) => {

    const handleSelect = (item: Option) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item))
        } else {
            setSelected([...selected, item])
        }
    }

    console.log(selected.some(currentItem => currentItem.value === "Item 2") ? "border-teal-400 hover:border-teal-600" : "hover:border-teal-100 border-transparent")

    return (
        <div className="flex flex-col w-full">
            {items.map(item => (
                <div onClick={() => handleSelect(item)} key={item.value} className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
                    <div className={`flex w-full items-center p-2 pl-2 border-l-2 relative 
                        ${selected.some(currentItem => currentItem.value === item.value) ? "border-teal-400 hover:border-teal-600" : "hover:border-teal-100 border-transparent"}`}>
                        <div className="w-full items-center flex">
                            <div className="mx-2 leading-6">{item.label}</div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default SelectorList