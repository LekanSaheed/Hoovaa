import React from 'react'
import { BsLaptop, BsTv } from 'react-icons/bs'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import './BuyItem.css'
import {IoLogoGameControllerA, IoMdPhonePortrait} from 'react-icons/io'
import BuyGoods from './Buy/BuyGoods'
import CartButton from './CartButton'
import trolley from '../../assets/trolley.png'
import HowItWorks from '../HowItWorks'
import add from '../../assets/addtocart.png'
import { GoCheck } from 'react-icons/go'
import { RiFridgeLine } from 'react-icons/ri'
import Search from '../Search'
import Brands from './Buy/Brands'
import { GlobalContext } from '../../reducers/context'


const BuyItem = () => {
    const {state} = GlobalContext()
    const data = [
        {text: 'Phones',
        icon: <IoMdPhonePortrait/>,
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
    {text: 'Home Appliances',
        icon:  <RiFridgeLine/>
    }
    ]
    const {url, path} = useRouteMatch()
const allItems = data.map((item, index) => {
 
    return(
        <Link  key={index} style={{color: 'black'}} to={url + '/' + item.text.toLowerCase().replace(/ /g, '-') + '-brands'}>
        <div className='buy-node'>
                <div className='sale-icons'>{item.icon}</div>
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
               
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}> 
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
                 Doorpost Delivery
              </div>
          </div>
         </div>
          </div>
          <Search/>
              <div className="buy-items">
                
                  {allItems}
              </div>
           </div>
          </div>
            
            </div>
               </Route>
              <Route path={path + '/buy-phones'}>
                  <BuyGoods/>
              </Route>
              <Route path={path + '/phones-brands'}>
                  <Brands  device='phone' brands={state.phoneBrands}/>
              </Route>
              <Route path={path + '/laptops-brands'}>
                  <Brands  device='laptop' brands={state.laptopBrands}/>
              </Route>
          </Switch>

          <HowItWorks/>
          </div>
       
    )
}

export default BuyItem
