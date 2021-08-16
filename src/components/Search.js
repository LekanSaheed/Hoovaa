import React, {  useState } from 'react'
import {  AiOutlineSearch } from 'react-icons/ai'
import { GlobalContext } from '../reducers/context'
import './Search.css'

const Search = () => {
const {state} = GlobalContext()

    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const [modal, setModal] = useState(false)
    const [match, setMatch] = useState(false)
    const handleSearch = (e) => {
        setSearch(e.target.value)
    
            const args = state.phoneData.filter(item => item.name.toUpperCase().includes(search.toUpperCase()))
            setResult(args)
            if(args){
                setMatch(true)
                setModal(true)
                if(search === '' || search === ' '){
                    setModal(false)
                }
            }
            else{
                setMatch(false)
            }
        
    
    }

    return (
       <div>
            <div className='search-container'>
            <AiOutlineSearch/>
            <input type='search' onChange={handleSearch} placeholder='Search your brand or model'/>
            
        </div>
        {modal && <div style={{backgroundColor: 'white', width: '100%', minHeight: '100vh'}}>
        { match ? result.map(item => {
            return(
                <li>{item.name}</li>
            )
        }) : <div>not match</div>}
        </div> }
       </div>
       
    )
}

export default Search
