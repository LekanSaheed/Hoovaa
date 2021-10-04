import React from 'react'
import {  AiOutlineSearch } from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './Search.css'

const Search = ({search}) => {

    return (
       <Link to='/search'>
            <div id='search' className={`search-container ${search}`}>
            <AiOutlineSearch style={{color: '#7497ff'}}/>
            <input className={search} type='search' placeholder='Search your brand or model'/>
            
        </div>
       </Link>
       
    )
}

export default Search
