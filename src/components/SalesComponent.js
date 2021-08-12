import React from 'react'
import { AiOutlineEuro, AiOutlineLaptop, AiOutlineThunderbolt, AiOutlineTool } from 'react-icons/ai'
import './SalesComponent.css'
import {Link} from 'react-router-dom'
const salesData = [
    {
        info: 'Sell',
        icon: <AiOutlineLaptop/>,
        to: 'sell-item'
    },
    {
        info: 'Buy',
        icon: <AiOutlineEuro/>,
        to: 'buy-item'
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
    }
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
