import { Link } from 'react-router-dom'
import React from 'react'
import {FaOpencart} from 'react-icons/fa'
import { useRouteMatch } from 'react-router-dom'
import {Fab} from '@material-ui/core/'
import './CartButton.css'
import { GlobalShop } from './Buy/CartContext'

const CartButton = () => {
     const {state} = GlobalShop()
    const {url} = useRouteMatch()

    return (
       
           <Link className='cart-btn-btn' to={`${url + '/cart'}`} style={{color: 'white',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}> 
           <div style={{fontSize: '14px', position: 'relative', zIndex: '1', color: 'white', marginBottom: '-14px',
            fontWeight: '600', backgroundColor: '#7497ff',
             borderRadius: '50%', padding: '3px 7px'}}>
                {state.cart.length}
           </div>
           <Fab className='MuiFab-primary'>
                <FaOpencart style={{fontSize: '18px'}}/>
           </Fab>
                </Link>
      
    )
}

export default CartButton
