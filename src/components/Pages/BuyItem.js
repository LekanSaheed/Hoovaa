import React from 'react'
import { BsLaptop, BsTv } from 'react-icons/bs'
import {FcPhoneAndroid} from 'react-icons/fc'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import './BuyItem.css'
import {IoLogoGameControllerA} from 'react-icons/io'
import BuyGoods from './Buy/BuyGoods'
import {ShopProvider} from './Buy/CartContext'
import CartButton from './CartButton'
import Cart from './Buy/Cart'
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
        <div className='buy-node' key={index}>
            <li><Link style={{color: 'black'}} to={url + '/buy-' + item.text.toLowerCase().replace(/ /g, '-')}>{item.icon}{item.text}</Link></li>
        </div>
    )
})

    return (

      <ShopProvider>
            <div className='item-container'>
            <CartButton/>
           <Switch>
               <Route exact path={path}>
            <div className='buy-grid'>
            <h4>What would you like to buy</h4>
              <div className="buy-items">
                  {allItems}
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
          </div>
      </ShopProvider>
       
    )
}

export default BuyItem
