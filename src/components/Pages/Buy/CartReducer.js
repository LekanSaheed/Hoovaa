
export const cartReducer = (state, action) => {
    if(action.type === "VIEW_DEVICE"){
        const selected = action.payload
        localStorage.setItem('selected', JSON.stringify(selected) )
        return{
            ...state,
            clickedDevice: [action.payload]
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
        localStorage.setItem('cart', JSON.stringify(state.cart) )
        const find = state.cart.find(item => item === newItem)
        console.log(find)
        return{
            ...state,
            cart: [...state.cart, newItem],
            isModal: true,
            modalContent: action.payload.name + ' is Added to cart Sucessfully'
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