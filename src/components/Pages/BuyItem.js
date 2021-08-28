import React from 'react'
import { BsLaptop, BsTv } from 'react-icons/bs'
import {FcPhoneAndroid} from 'react-icons/fc'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import './BuyItem.css'
import {IoLogoGameControllerA} from 'react-icons/io'
import BuyGoods from './Buy/BuyGoods'
import CartButton from './CartButton'
import Cart from './Buy/Cart'
import trolley from '../../assets/trolley.png'
import HowItWorks from '../HowItWorks'
import add from '../../assets/addtocart.png'
import { GoCheck } from 'react-icons/go'

const BuyItem = () => {
    const data = [
        {text: 'Phones',
        icon: <FcPhoneAndroid/>,
    },
    {text: 'Laptops',
        icon: <BsLaptop/>,
    },
    {text: 'TV',
        icon: <BsTv/>,
    },
    {text: 'Gaming Gadgets',
        icon: <IoLogoGameControllerA/>,
    },
    {text: 'Phones',
        icon: <FcPhoneAndroid/>
    }
    ]
    const {url, path} = useRouteMatch()
const allItems = data.map((item, index) => {
 
    return(
        <Link style={{color: 'black'}} to={url + '/buy-' + item.text.toLowerCase().replace(/ /g, '-')}>
        <div className='buy-node' key={index}>
                <div>{item.icon}</div>
                <div>{item.text}</div>
        </div>
        </Link>
    )
})

    return (

        
            <div className='item-container'>
            <CartButton/>
           <Switch>
               <Route exact path={path}>
            <div className='buy-grid'>
            <p className='centered-text'>What would you like to buy</p>
          <div className='flex-items-and-img'>
          <div className='buy-img-con'>
                <img className='buy-img1' src={trolley} alt='trolley'/>
                <img className='buy-img2' src={add} alt='add2cart'/>
            </div>
           <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
               
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}> 
          <div className="buy-text">Choose your Category of choice or search gadget</div>
         <div className='gt-con'>
         <div className='guarantee-text'>
          <span><GoCheck/></span>
              <div>
                 Top Quality Products
              </div>
          </div>
          <div className='guarantee-text'>
          <span><GoCheck/></span>
              <div>
                100% Guarantee
              </div>
          </div>
          <div className='guarantee-text'>
          <span><GoCheck/></span>
              <div>
                 DoorPost Delivery
              </div>
          </div>
         </div>
          </div>
              <div className="buy-items">
                
                  {allItems}
              </div>
           </div>
          </div>
            
            </div>
               </Route>
               <Route path={path + '/cart'}>
              <Cart/>
          </Route>
              <Route path={path + '/buy-phones'}>
                  <BuyGoods/>
              </Route>
          </Switch>
          <HowItWorks/>
          </div>
       
    )
}

export default BuyItem
