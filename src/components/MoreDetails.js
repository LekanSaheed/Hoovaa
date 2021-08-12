import React from 'react'
import business from '../assets/business.png'
import './MoreDetails.css'
const MoreDetails = () => {
    return (
        <div>
            <div className='img-container'>
                <img src={business} alt='logo'/>
            </div>
            <p>
                trust us
            </p>
        </div>
    )
}

export default MoreDetails
