import React, {} from 'react'
import { GlobalShop } from './CartContext'
import './Cart.css'
import {BsTrash} from 'react-icons/bs'
import { Box, Button, CardMedia, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Cart = () => {
    const {state, removeItem, clearCart, increment, decrement} = GlobalShop()

 
        const getPosition = (position) => {
            console.log('position',position.coords.longitude)
        }
        
       if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition, (error)=> {
            console.log('Error', error.message)
        })

    }
    else{
        console.log('cant get location')
    }
    
    
      const useStyle = makeStyles(theme => ({
          root: {

          },
          incdec: {
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              border: 'solid 1px lightgrey',
              padding: '5px',
              borderRadius: '10px',
              fontSize: '15px',
              marginLeft: '10px',
              [theme.breakpoints.up('500')]: {
                  flexDirection: 'column-reverse',
                  border: 'none',
                  fontSize: '20px'
              }
          },
          quantity: {
            alignItems: 'center',
            padding: '5px',
              [theme.breakpoints.up('500')]: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'

              }
          },
          qidCon: {
           
          },
          contBtn:{
              padding: '0px',
              fontSize: '19px'
              
          }

      }))
const classes = useStyle()
    return (
        <div className='cart-container'>
        
            <div className='cart-item-container'>
               {state.cart.length < 1 ? <div className='theme-text'>No item in cart <Link className='bordered' to='/buy-item'>Start Buying</Link></div> : state.cart.map((item, idx) => {
                    return(
                        <div key={idx} className='cart-item'>
                            <CardMedia className='MuiCardMedia-img' children={<img src={item.img} alt='product'/>}/>
                            <div className='cart-item-name'>
                     {item.name}
                            </div>
                            <div className='cart-item-price'>
                      <span> Product Price:</span>  ${item.price}
                            </div>
                            <div className='cart-item-brand'>
                        Brand: {item.brand}
                            </div>
                          <Box display='flex' flexDirection='row' className={classes.quantity}>
                          <div className={classes.qidCon}>
                        Quantity: 
                            </div> 
                            <Box className={classes.incdec} display='flex' >
                       <Button className={classes.contBtn} onClick={() => increment(item)}>+</Button>
                       {item.quantity}
                       <Button className={classes.contBtn} children={'-'} onClick={() => decrement(item)}/>
                            </Box>
                          </Box>
                            <Button   onClick={() => removeItem(item.id)}>Remove</Button>
                        </div>
                    )
                })}
                <div>
                {state.cart.length > 0 &&  <Button color='secondary'  onClick={() => clearCart()}
                 children={<>
                      <span>Clear all</span>
                      <BsTrash/>
                       </>}/>}
                </div>
            </div>

       {state.cart.length > 0 &&   <div className='total-item-and-checkout'>
             <div className='order-summary'>
                 <p>ORDER SUMMARY</p>
             </div>
         <div className='cart-total-group'>
             <div className='cart-total'>
                 <div>
                     Sub Total
                 </div>
                 <div>
                     ${state.cart.map(i => i.price * i.quantity).reduce((a,b) => a + b, 0)}
                     </div>
             </div>
             <div className='cart-total'>
                 <div>
                Shipping Fees
                 </div>
                 <div>
                     ${state.shippingFees.filter(i => i.distance === 'far').map(i => i.fee)}
                 </div>
             </div>
             <div className='cart-total'>
                 <div>
                  Estimated Total 
                 </div>
                 <div>
                     $
                 </div>
             </div>
         
         </div>
         <button className='order-summary checkout'>CHECKOUT</button>
         </div>}
        </div>
    )
}

export default Cart
