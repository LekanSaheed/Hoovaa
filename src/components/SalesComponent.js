import React from 'react'
import { AiOutlineEuro, AiOutlineLaptop, AiOutlineInsurance,
     AiOutlineThunderbolt, AiOutlineTool } from 'react-icons/ai'
import {FaCashRegister} from 'react-icons/fa'
import './SalesComponent.css'
import {Link} from 'react-router-dom'
const salesData = [
    {
        info: 'Buy',
        icon: <AiOutlineEuro/>,
        to: 'buy-item'
    },
    {
        info: 'Sell',
        icon: <AiOutlineLaptop/>,
        to: 'sell-item'
    },
    {
        info: 'Swap',
        icon: <AiOutlineThunderbolt/>,
        to: 'swap-item'
    },
    {
        info: 'Repair',
        icon: <AiOutlineTool/>,
        to: 'repair-device'
    },
    {
        info: 'Gadget Insurance',
        icon: <AiOutlineInsurance/>,
        to: 'insurance'
    },
    {
        info: 'Register Gadget',
        icon: <FaCashRegister/>,
        to: 'register-gadget'
    },
]
const SalesComponent = () => {
    const sell = salesData.map((item, index) => {
        return(
            <div key={index} className='sale-item'>
               <Link to={item.to}>
               <p className='sale-icon'>{item.icon}</p>
                <p>{item.info}</p>
                </Link>
            </div>
        )
    })
    return (
        <div className='sales-container'>
            <p className='sales-intro'>What would you like to do?</p>
            <div className='sale-grid'>
                {sell}
            </div>
     </div>
    )
}
export default SalesComponent
