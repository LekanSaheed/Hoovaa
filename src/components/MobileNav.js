
import React from 'react'

import { GlobalContext } from '../reducers/context'

import './MobileNav.css'

import HoovaaAccordion from './HoovaaAccordion'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import {MdLocationOn} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'


const MobileNav = () => {
    const {state, toggleNav, closeNav, cityStat} = GlobalContext()
    
const openCity = () => {
    closeNav()
    cityStat()
    
}
    return (
        <div className={`${state.toggle ? 'show-nav' : 'nav-container'}`}>
            <div className='nav-data'>
                <div className='nav-data-flex'>
                 <div style={{display: 'flex', alignItems:'center'}}>
                 <MdLocationOn/>
                   <div> <div>Your city<br/>
                   <div style={{display: 'flex', alignItems: 'center'}}> 
                   <span style={{fontSize: '15px', fontWeight: '500'}} 
                   onClick={openCity}>{state.city ? state.city : 'Select a city'}</span><AiOutlineCaretDown/></div>
                    </div>
                    </div>
                 </div>
                    <div onClick={toggleNav}><CgClose style={{fontSize: '30px',
                    }}/></div>
                    </div>
                   <Box display='flex' justifyContent='space-between'
                   alignItems='center' padding='10px'>
                   { <Link
                    onClick={closeNav}to={`${state.isUser ? '/account' : '/login'}`}>
                        <Button variant='contained' size='small' color='primary' children={state.isUser ? 'Account' : 'Login'}/>
                        </Link>}
                   {state.isUser &&  <div>Hi {state.currentUser.displayName}</div>}
                   </Box> 
             </div>
            <HoovaaAccordion/>
        </div>
    )
}

export default MobileNav
