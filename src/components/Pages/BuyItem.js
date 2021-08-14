import React from 'react'
import { BsLaptop, BsTv } from 'react-icons/bs'
import {FcPhoneAndroid} from 'react-icons/fc'
import { Link } from 'react-router-dom'
import './BuyItem.css'
import {IoLogoGameControllerA} from 'react-icons/io'

const BuyItem = () => {
    const data = [
        {text: 'Phones',
        icon: <FcPhoneAndroid/>,
        to: 'buy-phones'
    },
    {text: 'Laptops',
        icon: <BsLaptop/>,
        to: 'buy-laptops'
    },
    {text: 'TV',
        icon: <BsTv/>,
        to: 'buy-tv'
    },
    {text: 'Gaming Gadgets',
        icon: <IoLogoGameControllerA/>,
        to: 'buy-phones'
    },
    {text: 'Phones',
        icon: <FcPhoneAndroid/>,
        to: 'buy-phones'
    }
    ]

const allItems = data.map((item, index) => {
    return(
        <div key={index}>
            <li><Link to={item.to}>{item.icon}{item.text}</Link></li>
        </div>
    )
})

    return (
        <div className='item-container'>
            <h4>What would you like to buy</h4>
            <div className="buy-items">
                {allItems}
            </div>
        </div>
    )
}

export default BuyItem
