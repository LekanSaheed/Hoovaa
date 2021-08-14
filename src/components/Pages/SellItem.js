import React from 'react'
import './sellItem.css'
import sell from '../../assets/sell.png'
import { BsTv } from 'react-icons/bs'
import { AiOutlineDesktop, AiOutlineLaptop } from 'react-icons/ai'
import { IoLogoGameControllerB, IoMdPhonePortrait } from 'react-icons/io'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import Phones from './subPages/Phones'
import HowItWorks from '../HowItWorks'
const SellItem = () => {

   const {url, path} = useRouteMatch()
  
    
    const data = [
        {text: 'Phones',
          icon: <IoMdPhonePortrait/>,
          to: '/phones'
},
{text: 'Laptops',
          icon: <AiOutlineLaptop/>,
          to: '/laptops'
},
{text: 'Computers',
          icon: <AiOutlineDesktop/>,
          to: '/computers'
},
{text: 'Gaming Gadgets',
          icon: <IoLogoGameControllerB/>,
          to: '/gaming-gadgets'
},
{text: 'TVs',
          icon: <BsTv/>,
          to: '/tv'
}
    ]

    return (
        <div className='sell-page-container'>
            <div className='centered-text'>
                <img src={sell} alt='sell' />
                <span>Sell Your Stuff and Get Cash Instantly</span></div>
            <div className='sell-items-container'>
                <span>what would you like to sell</span>
                <ul>
                    {data.map((item, index) => {
                        return(
                           <li key={index}> 
                           <Link to={url + item.to} className='sale-items'>
                                <span className='sale-icons'>{item.icon}</span>
                                <span>{item.text}</span>
                                </Link>
                          </li>
                        )
                    })}
                </ul>
            </div>
            
            <Switch>
                    <Route path='/sell-item/phones'>
                        <Phones/>
                    </Route>

            </Switch>
            <HowItWorks/>

            

        </div>
    )
}

export default SellItem
