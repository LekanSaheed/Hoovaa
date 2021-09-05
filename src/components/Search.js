import React from 'react'
import {  AiOutlineSearch } from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './Search.css'

const Search = () => {

    return (
       <Link to='/search'>
            <div className='search-container'>
            <AiOutlineSearch/>
            <input type='search' placeholder='Search your brand or model'/>
            
        </div>
       </Link>
       
    )
}

export default Search
