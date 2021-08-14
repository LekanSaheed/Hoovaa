import React from 'react'
import './Phones.css'
import {BsPhone} from 'react-icons/bs'

const Phones = () => {
    const apple = require('../ios.json')

    return (
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
    )
}

export default Phones
