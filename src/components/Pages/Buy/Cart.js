import React, {} from 'react'
import { GlobalShop } from './CartContext'

const Cart = () => {
    const {state, removeItem, clearCart} = GlobalShop()
       

    return (
        <div>
            cart here
            <div>
               {state.cart.length < 1 ? 'No item in cart' : state.cart.map((item, idx) => {
                    return(
                        <div key={idx}>
                            <div>
                        Name   {item.name}
                            </div>
                            <div>
                        Price   {item.price}
                            </div>
                            <div>
                        brand   {item.brand}
                            </div>
                            <button onClick={() => removeItem(item.id)}>remove</button>
                        </div>
                    )
                })}
            </div>

            <button onClick={() => clearCart()}>Clear all</button>
        </div>
    )
}

export default Cart
