import React from 'react'
import { SearchBoxProps } from './types'

const SearchBox: React.FC<SearchBoxProps> = ({ hint, handleSearch }) => {

    const [searchTerm, setSearchTerm] = React.useState('')

    // Search for a term when click enter
    return (
        <div className="flex justify-center">
            <div className="relative">
                <input
                    className="peer w-full p-4 pl-10 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder={hint}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(searchTerm);
                        }
                    }}
                />
                <svg className="absolute left-4 top-5 inline-block w-5 h-5 active:stroke-[#111516] peer-focus:stroke-blue-500 stroke-current text-gray-500" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"
                    onClick={() => handleSearch(searchTerm)}>
                    <title id="title">Search Icon</title>
                    <desc id="desc">A magnifying glass icon.</desc>
                    <g className='stroke-2' fill="none">
                        <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                        <circle cx="8" cy="8" r="7" />
                    </g>
                </svg>
            </div>
        </div>

    )
}

export default SearchBox