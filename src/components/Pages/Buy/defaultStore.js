const localCart = JSON.parse(localStorage.getItem('cart'))

export const defaultStore = {
    clickedDevice: [],
    cart: localCart ? localCart : [],
    isModal: false,
    modalContent: '',
    device: [{name: 'iphone 5', desc: 'Et minim deserunt quis pariatur cillum eiusmod anim exercitation ea.', price: 450}]
}