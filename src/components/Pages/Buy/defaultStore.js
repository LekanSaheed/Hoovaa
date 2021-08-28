const localCart = JSON.parse(localStorage.getItem('cart'))

export const defaultStore = {
    clickedDevice: [],
    cart: localCart ? localCart : [],
    isModal: false,
    modalContent: ''
}