const localCart = JSON.parse(localStorage.getItem('cart'))
const recentlyViewed = localStorage.getItem('recent')

export const defaultStore = {
    clickedDevice: [],
    cart: localCart ? localCart : [],
    isModal: false,
    modalContent: '',
    device: [],
    shippingFees: [{distance: 'near', fee: 0}, {distance: 'mid', fee: 30}, {distance: 'far', fee: 50}],
    totalAmount: localStorage.getItem('totalAmount') ? parseInt(localStorage.getItem('totalAmount')) : 0,
    recentlyViewed: recentlyViewed ? JSON.parse(recentlyViewed) : [],
}
