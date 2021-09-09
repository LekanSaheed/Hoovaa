import React from 'react'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'

import { GlobalShop } from './CartContext'
import GadgetDetails from './GadgetDetails'
import './BuyGoods.css'
const BuyGoods = () => {
    const phones = [
        {name: 'Tecno Pop 2',
        category: 'phones',
        brand: 'tecno',
        price: 50,
        id:432

    },
    {name: 'Iphone x',
        category: 'phones',
        brand: 'apple',
        price: 3430,
        id: 3655

    },
    {name: 'Iphone 6',
    category: 'phones',
    brand: 'apple',
    price: 330,
    id: 34555

},
{name: 'Samsung A12',
category: 'phones',
brand: 'samsung',
price: 3440,
id: 3435

},
{name: 'Infinix S5',
category: 'phones',
brand: 'infinix',
price: 3430,
id: 345676

}
    ]
    const {viewDevice} = GlobalShop()
    const {path, url} = useRouteMatch()
    
    React.useEffect(() => {
        window.scrollTo(0,0)
    },[])
    return (
      <Switch>
          <Route exact path={path}>
          <div>
            Top selling phones
            <Link to={'/buy-item/cart'}>Go To cart</Link>

            <div className='goods-container'>
                {phones.map((item, idx) => {
                    return(
                        <Link className='goods-node' key={idx} to={url + '/' + item.name.toLowerCase().replace(/ /g, '-') + '-' + item.id}
                        onClick={() => viewDevice(item)}> 
                        <div>{item.name}</div>
                      <div> ${item.price}</div>
                        </Link>
                    )
                })}
            </div>
        </div>


          </Route>

          <Route path={path + '/:id'}>
              <GadgetDetails/>
          </Route>
          <Route path={path + '/:id'}>
              Also
          </Route>
      </Switch>
    )
}

export default BuyGoods
