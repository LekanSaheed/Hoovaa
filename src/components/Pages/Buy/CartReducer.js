
export const cartReducer = (state, action) => {
    if(action.type === "VIEW_DEVICE"){
        const selected = action.payload
        localStorage.setItem('selected', JSON.stringify(selected) )
        localStorage.setItem('recent', JSON.stringify(state.recentlyViewed) )
        return{
            ...state,
            clickedDevice: [action.payload],
            recentlyViewed: [...state.recentlyViewed, action.payload]
        }
    }
    if(action.type === 'SET_TOTAL_AMOUNT'){
        localStorage.setItem("totalAmount", JSON.stringify(action.payload))
        return{
            ...state,
            totalAmount: action.payload
        }
    }
    if(action.type === "CLOSE_MODAL"){
        return{
            ...state,
            isModal: false
        }
    }
    if(action.type === 'ADD_TO_CART'){
        const newItem = action.payload
      
        const find = state.cart.find(item => item.id === newItem.id)
        newItem.quantity = 1
       if(find){
        localStorage.setItem('cart', JSON.stringify(state.cart) )
           newItem.quantity += 1
           return{
               ...state,
               isModal: true,
               modalContent: 'Product quantity increased',
               
           }
       }
       else{
        localStorage.setItem('cart', JSON.stringify(state.cart) )
        return{
            ...state,
            cart: [...state.cart, newItem],
            isModal: true,
            modalContent: action.payload.name + ' is Added to cart Sucessfully'
        }
       }
    }
    if(action.type === 'REMOVE_ITEM'){
        const id = action.payload
        const newCart = state.cart.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(newCart) )
        return{
            ...state,
            cart: newCart,
            isModal: true,
            modalContent: '1 product removed successfully'

        }
    }

    if(action.type === "INCREMENT"){
        const current = action.payload
       const update = state.cart.map(item => item.id === current.id ? {...item, quantity: item.quantity + 1} : item)
        return{
            ...state,
            isModal: true,
            modalContent: 'Product quantity succesfully increased',
            cart: update
        }
    }
    if(action.type === "DECREMENT"){
        const current = action.payload
       const update = state.cart.map(item => item.id === current.id ? {...item, quantity: item.quantity - 1} : item).filter(item => item.quantity !== 0)
        return{
            ...state,
            isModal: true,
            modalContent: 'Product quantity succesfully Decreased',
            cart: update
        }
    }
    if(action.type === "CLEAR_CART"){
        localStorage.removeItem('cart')
        return{
            ...state,
            cart: [],
            isModal: true,
            modalContent: 'Cart Emptied Succesfully'
        }
    }
    return state
} 
