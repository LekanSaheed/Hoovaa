import React, {useRef} from 'react'
import { AiFillPhone, AiOutlineMenu} from 'react-icons/ai'
import './Header.css'
import {GlobalContext} from '../reducers/context'
import { Link } from 'react-router-dom'
import LgNav from './LgNav'
const Header = () => {

    const headerRef = useRef(null)
   
const {toggleNav} = GlobalContext()
    return (
        <>
            <div className='header-container' id='tdop' ref={headerRef}>
                <div className='logo'><Link to='/'>HOOVAA<AiFillPhone/></Link></div>
                
                <div className='menu'>
                <AiOutlineMenu style={{fontSize: '20px'}}onClick={toggleNav}/>
                </div>
                <LgNav/>
            </div>
        </>
    )
}

export default Header
