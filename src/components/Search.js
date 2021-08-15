import React, { useState } from 'react'
import { AiOutlineMergeCells, AiOutlineSearch } from 'react-icons/ai'
import { GlobalContext } from '../reducers/context'
import './Search.css'

const Search = () => {
const {state} = GlobalContext()

    const [search, setSearch] = useState('')
    const [result, setResult] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value)
        const args = state.phoneData.find(item => item.name === search)
console.log(args)
        const filtered = () => {
            if (search === args){
                console.log(args)
                setResult(AiOutlineMergeCells)
            }
        }
        filtered()
    }

    return (
        <div className='search-container'>
            <AiOutlineSearch/>
            <input type='search' onChange={handleSearch} placeholder='Search your brand or model'/>
            {result.name}
        </div>
    )
}

export default Search
