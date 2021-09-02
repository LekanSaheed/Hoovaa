import { Link } from 'react-router-dom'
import React from 'react'
import {FaOpencart} from 'react-icons/fa'
import {Fab} from '@material-ui/core/'
import './CartButton.css'
import { GlobalShop } from './Buy/CartContext'
import {Badge} from '@material-ui/core'

const CartButton = () => {
     const {state} = GlobalShop()

    return (
       
         
          //  <div style={{fontSize: '14px', position: 'relative', zIndex: '1', color: 'white', marginBottom: '-14px',
          //   fontWeight: '600', backgroundColor: '#7497ff',
          //    borderRadius: '50%', padding: '3px 7px'}}>
          //       {state.cart.length}
          //  </div>
          //  <Fab className='MuiFab-primary'>
          //       <FaOpencart style={{fontSize: '18px'}}/>
          //  </Fab>
          //   
          <Link className='cart-btn-btn' to='/cart'>
          <Badge color="secondary" overlap='circular' showZero={true} badgeContent={<div>{state.cart.length}</div>} 
          children={ <Fab className='MuiFab-primary'>
                 <FaOpencart style={{fontSize: '18px'}}/>
           </Fab>} />
               </Link>
      
    )
}

export default CartButton
