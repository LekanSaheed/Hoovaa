import React from 'react'
import './Phones.css'
import {BsPhone} from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import HowItWorks from '../../HowItWorks'

const Phones = () => {
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    const apple = require('../ios.json')
const history = useHistory()
    return (
        <div className="item-page">
            <div  className="item-page-header" id="top2">
                <AiOutlineArrowLeft onClick={() => history.goBack()}/>
                <AiOutlineSearch/>
            </div>
            <p style={{textAlign: 'center', fontWeight: 'bolder', marginTop: '40px'}}>Apple Phones</p>
        <div className='grid-item-container'>
            {apple.map((item, index) => {
                return(
                    <div className='grid-item-item' key={index}>
                        <div className='grid-img'><BsPhone/></div>
                       <span> {item.pn}</span>
                       </div> 
                )
            })}
        </div>
        <HowItWorks/>
        </div>
    )
}

export default Phones
