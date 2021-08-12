import { Link } from 'react-router-dom'
import React from 'react'

import { GlobalContext } from '../reducers/context'

import './MobileNav.css'

import HoovaaAccordion from './HoovaaAccordion'
import { AiOutlineClose } from 'react-icons/ai'

const MobileNav = () => {
    const {state, toggleNav} = GlobalContext()
    return (
        <div className={`${state.toggle ? 'show-nav' : 'nav-container'}`}>
            <div className='nav-data'>
                <div className='nav-data-flex'>
                    <span>Your city</span>
                    <div onClick={toggleNav}><AiOutlineClose style={{fontSize: '22px', textShadow: '0 0 5px 5px white'}}/></div>
                    </div>
             </div>
            <HoovaaAccordion/>
        </div>
    )
}

export default MobileNav
