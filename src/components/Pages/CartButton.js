import { Link } from 'react-router-dom'
import React from 'react'
import {FaOpencart} from 'react-icons/fa'
import { useRouteMatch } from 'react-router-dom'
import {Fab} from '@material-ui/core/'
import './CartButton.css'

const CartButton = () => {
    const {url} = useRouteMatch()

    return (
       
           <Link className='cart-btn-btn' to={`${url + '/cart'}`} style={{color: 'white'}}> 
           <Fab className='MuiFab-primary'>
                <FaOpencart style={{fontSize: '18px'}}/>
           </Fab>
                </Link>
      
    )
}

export default CartButton
