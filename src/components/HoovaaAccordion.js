import React from 'react'
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { GlobalContext } from '../reducers/context'
import {Link } from 'react-router-dom'
const HoovaaAccordion = () => {
    const {closeNav} = GlobalContext()
    return (
        <div className='accordion'>
             
             <Accordion>
        <AccordionSummary expandIcon={<AiOutlineCaretDown/>} >
            Services
        </AccordionSummary>
        <AccordionDetails>
        <p >
            <Link to='/sell-item' onClick={closeNav}>Sell</Link>
        </p>
        </AccordionDetails>
        <AccordionDetails>
        <p >
            <Link to='/buy-item' onClick={closeNav}>Buy</Link>
        </p>
        </AccordionDetails>
       
        <AccordionDetails>
        <p >
            <Link to='/swap-item' onClick={closeNav}>Swap</Link>
        </p>
        </AccordionDetails>
        <AccordionDetails>
        <p >
            <Link to='/repair-device' onClick={closeNav}>Repair</Link>
        </p>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary expandIcon={<AiOutlineCaretDown/>} >
            About
        </AccordionSummary>
        <AccordionDetails>
        <p >
            <Link onClick={closeNav} to='/'>
            home
            </Link>
        </p>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary expandIcon={<AiOutlineCaretDown/>} >
            Help
        </AccordionSummary>
        <AccordionDetails>
        <p >
            <Link onClick={closeNav} to='/'>
            home
            </Link>
        </p>
        </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default HoovaaAccordion
