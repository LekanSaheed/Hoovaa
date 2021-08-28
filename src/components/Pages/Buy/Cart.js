import React, {} from 'react'
import { GlobalShop } from './CartContext'
import './Cart.css'


const Cart = () => {
    const {state, removeItem, clearCart} = GlobalShop()
       

    return (
        <div className='cart-container'>
           My Cart
            <div className='class-item-container'>
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
                            <button className='remove-btn' onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    )
                })}
            </div>

           {state.cart.length > 0 &&  <button onClick={() => clearCart()}>Clear all</button>}
        </div>
    )
}

export default Cart
