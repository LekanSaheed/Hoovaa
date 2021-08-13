import React from 'react'
import { AiFillPhone, AiOutlineMenu} from 'react-icons/ai'
import './Header.css'
import {GlobalContext} from '../reducers/context'
import { Link } from 'react-router-dom'
import LgNav from './LgNav'
const Header = () => {
const {toggleNav} = GlobalContext()
    return (
        <div>
            <div className='header-container'>
                <div className='logo'><Link to='/'>HOOVAA<AiFillPhone/></Link></div>
                
                <div className='menu'>
                <AiOutlineMenu style={{fontSize: '20px'}}onClick={toggleNav}/>
                </div>
                <LgNav/>
            </div>
        </div>
    )
}

export default Header
