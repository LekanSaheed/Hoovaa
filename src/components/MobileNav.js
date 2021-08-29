
import React from 'react'

import { GlobalContext } from '../reducers/context'

import './MobileNav.css'

import HoovaaAccordion from './HoovaaAccordion'
import { AiOutlineCaretDown, AiOutlineClose } from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import { Link } from 'react-router-dom'


const MobileNav = () => {
    const {state, toggleNav, closeNav} = GlobalContext()
    
const openCity = () => {
    closeNav()
    
}
    return (
        <div className={`${state.toggle ? 'show-nav' : 'nav-container'}`}>
            <div className='nav-data'>
                <div className='nav-data-flex'>
                 <div style={{display: 'flex', alignItems:'center'}}>
                 <MdLocationOn/>
                   <div> <div>Your city<br/>
                   <div style={{display: 'flex', alignItems: 'center'}}> <span style={{fontSize: '15px', fontWeight: '500'}} onClick={openCity}>{state.city}</span><AiOutlineCaretDown/></div>
                    </div>
                    </div>
                 </div>
                    <div onClick={toggleNav}><AiOutlineClose style={{fontSize: '22px', textShadow: '0 0 5px 5px white'}}/></div>
                    </div>
                    { <Link onClick={closeNav}to={`${state.isUser ? '/logout' : '/login'}`}>{state.isUser ? 'Logout' : 'Login'}</Link>}
             </div>
            <HoovaaAccordion/>
        </div>
    )
}

export default MobileNav
