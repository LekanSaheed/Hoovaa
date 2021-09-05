import React, {} from 'react'
import { GlobalShop } from './CartContext'
import './Cart.css'
import {BsTrash} from 'react-icons/bs'
import { Button } from '@material-ui/core'

const Cart = () => {
    const {state, removeItem, clearCart, increment, decrement} = GlobalShop()
       

    return (
        <div className='cart-container'>
        
            <div className='cart-item-container'>
               {state.cart.length < 1 ? 'No item in cart' : state.cart.map((item, idx) => {
                    return(
                        <div key={idx} className='cart-item'>
                            <div className='cart-item-name'>
                       *{item.name}
                            </div>
                            <div className='cart-item-price'>
                        ${item.price}
                            </div>
                            <div className='cart-item-brand'>
                        Brand   {item.brand}
                            </div>
                            <div className='cart-item-brand'>
                        Quantity  {item.quantity}
                            </div>
                            <div className='cart-item-brand'>
                       <button onClick={() => increment(item)}>Increemnt</button>
                       <Button children={'-'} onClick={() => decrement(item)}/>
                            </div>
                            <button className='remove-btn' onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    )
                })}
                  {state.cart.length > 0 &&  <button onClick={() => clearCart()}>
                      <span>Clear all</span>
                      <BsTrash/>
                       </button>}
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
                     $
                     </div>
             </div>
             <div className='cart-total'>
                 <div>
                Shipping Fees
                 </div>
                 <div>
                     $
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
