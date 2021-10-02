import React, {useEffect} from 'react'
import { GlobalShop } from './CartContext'
import './Cart.css'
import {BsFillTrash2Fill, BsTrash} from 'react-icons/bs'
import { Box, Button, CardMedia, makeStyles } from '@material-ui/core'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { AiFillMinusCircle ,  AiFillPlusCircle} from 'react-icons/ai'
import {CgShoppingCart} from 'react-icons/cg'
import {  RiEBike2Fill } from 'react-icons/ri'
import Checkout from './Checkout'

const Cart = () => {
    const {state, removeItem, clearCart, increment, decrement, setTotalAmount} = GlobalShop()
const {path, url} = useRouteMatch()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    //     const getPosition = (position) => {
    //         console.log('position',position.coords.longitude)
    //     }
        
    //    if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(getPosition, (error)=> {
    //         console.log('Error', error.message)
    //     })

    // }
    // else{
    //     console.log('cant get location')
    // }
    
    
      const useStyle = makeStyles(theme => ({
          root: {
            background: 'white',
            borderRadius: '5px',
            margin: '4px 7px',
            padding: '10px ',
            paddingBottom: '3px',
           boxShadow: '0 0 8px 0px rgba(0 0 0 /10%)'
           
          },
          mainCon:{
            borderBottom: 'solid 1px #f5f5f5',
            padding: '5px',
            gap: '10px'
          },
          incdec: {
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              padding: '5px',
              fontSize: '15px',
              [theme.breakpoints.up('500')]: {
                  flexDirection: 'column-reverse',
                  border: 'none',
                  fontSize: '20px',
                  alignItems: 'center'
              }
          },
          quantity: {
            alignItems: 'center',
            padding: '5px',
            justifyContent: 'space-between',
            marginTop: '2px',
              [theme.breakpoints.up('500')]: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'

              }
          },
          track:{
              fontSize: '14px'
          },
          remove: {
              display: 'flex',
              alignItems: 'center',
              color: '#7497ff'
          },
        
          contBtn:{
              padding: '0px',
              fontSize: '19px',
              color: '#7497ff'
              
          },
          price: {
              fontSize: '16px !important',
              color: 'black !important',
              fontWeight: '600 !important'
          },
          cartText: {
              
          }

      }))
const classes = useStyle()
    return (
        <Switch>
            <Route exact path={path}>
            <div className='cart-container'>
        
        <div className='cart-item-container'>
             <p style={{color: '#f50057', fontWeight: 'bold', padding: '10px'}}>MY CART: <span className='theme-text'>{state.cart.map(i => i.quantity)
             .reduce((a,b) => a + b, 0)} Item{state.cart.length < 1 ? '' : 's'} in cart</span></p>
           {state.cart.length < 1 ? <div className='theme-text'>No item in cart <Link className='bordered' to='/buy-item'>
               Start Buying</Link></div> : state.cart.map((item, idx) => {
                return(
                    // Cart Container
                    <Box key={idx} display='flex' className={classes.root} flexDirection='column'>
                        {/* Cart item MAIN */}
                        <Box display='flex' className={classes.mainCon}>
                        <CardMedia className='MuiCardMedia-img' children={<img style={{width: '120px'}}  src={item.img} alt='product'/>}/>
                        <div className={classes.cartText}>
                        <div className='cart-item-name'>
                 {item.name}
                        </div>
                        <div className='cart-item-brand'>
                    Brand: {item.brand[0].value}
                        </div>
                       
                        
                        <Box display="flex" className={classes.track}>
                            <span className='theme-text'>Hoovaa</span> <span style={{display: 'flex', alignItems: 'center'}}>
                                Fast Track <RiEBike2Fill className='theme-text'/></span>
                        </Box>
                        <div className='cart-item-price'>
                  <span> Product Price:</span> <span className={classes.price}> ${item.price}</span>
                        </div>
                        </div>
                    </Box>
                     {/* Cart item MAIN ends here*/}

                      <Box display='flex' flexDirection='row' className={classes.quantity}> 
                     <Box className={classes.remove}  onClick={() => removeItem(item.id)}>
                         <BsFillTrash2Fill/>
                     <span >REMOVE</span>
                     </Box>
                        <Box className={classes.incdec} display='flex' >
                   <Button className={classes.contBtn} onClick={() => increment(item)}><AiFillPlusCircle/></Button>
                   {item.quantity}
                   <Button className={classes.contBtn} children={<AiFillMinusCircle/>} onClick={() => decrement(item)}/>
                        </Box>
                       
                      </Box>
                      </Box>
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
                 ${state.cart.map(i => i.price * i.quantity).reduce((a,b) => a + b, 0).toLocaleString()}.00
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
    <Link to={url + '/checkout'}> 
    <Button variant='contained' onClick={() => setTotalAmount(state.cart.map(i => i.price * i.quantity).reduce((a,b) => a + b, 0))} color="primary" size='large' endIcon={<CgShoppingCart/>}
      className='order-summary checkout' >CHECKOUT</Button></Link>
     </div>}
    </div>
            </Route>

    <Route path={path + '/checkout'}>
        <Checkout/>
    </Route>
        </Switch>
    )
}

export default Cart
