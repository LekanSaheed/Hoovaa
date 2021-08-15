import React from 'react'
import './sellItem.css'
import sell from '../../assets/sell.png'
import { BsTv } from 'react-icons/bs'
import { AiOutlineDesktop, AiOutlineLaptop } from 'react-icons/ai'
import { IoLogoGameControllerB, IoMdPhonePortrait } from 'react-icons/io'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import HowItWorks from '../HowItWorks'
import PhoneBrands from './PhoneBrands'
import ApplePhones from './subPages/ApplePhones'
const SellItem = () => {

   const {url, path} = useRouteMatch()
  
    
    const data = [
        {text: 'Phones',
          icon: <IoMdPhonePortrait/>,
          to: '/phone-brands'
},
{text: 'Laptops',
          icon: <AiOutlineLaptop/>,
          to: '/laptop-brands'
},
{text: 'Computers',
          icon: <AiOutlineDesktop/>,
          to: '/computer-brands'
},
{text: 'Gaming Gadgets',
          icon: <IoLogoGameControllerB/>,
          to: '/gaming-gadgets-brands'
},
{text: 'TV-brands',
          icon: <BsTv/>,
          to: '/tv'
}
    ]
    console.log(path)

    return (
        <div className='sell-page-container'>
            <div className='centered-text'>
                <img src={sell} alt='sell' />
                <span>Sell Your Stuff and Get Cash Instantly</span></div>
            <div className='sell-items-container'>
                <span style={{fontWeight: '500'}}>What would you like to sell</span>
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
            
            <Switch >
                    <Route  path={`${path + '/phone-brands'}`}>
                        <PhoneBrands/>
                    </Route>
                    <Route path={`${path + '/laptop-brands'}`}>
                        <ApplePhones/>
                    </Route>
            </Switch>
            <HowItWorks/>

            

        </div>
    )
}

export default SellItem
