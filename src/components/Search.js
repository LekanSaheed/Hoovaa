import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import './Search.css'
const Search = () => {
    return (
        <div className='search-container'>
            <AiOutlineSearch/>
            <input type='search' placeholder='Search your brand or model'/>
        </div>
    )
}

export default Search
