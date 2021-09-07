
import {laptopBrands, phoneBrands, computerBrands, 
    smartSpeakerBrands, smartWatchbrands, tvBrands, gamingGadgetBrands, cameraBrands
} from '../components/Pages/PhoneData'
import iphone from '../assets/tecnoSpark4.jpg'
const localCurrentUser = localStorage.getItem('user')
const sessionSR = sessionStorage.getItem('result')
export const defaultState = {
    toggle: false,
    modalContent: '',
    isModal: false,
    phones: [{id: 1,name: 'tecno spark 4', price: 200, img: iphone, brand: 'tecno'}],
    phoneBrands: phoneBrands,
    laptopBrands: laptopBrands,
    computerBrands: computerBrands,
    smartSpeakerBrands: smartSpeakerBrands,
    smartWatchbrands: smartWatchbrands,
    tvBrands: tvBrands,
    gamingGadgetBrands: gamingGadgetBrands,
    cameraBrands: cameraBrands,
    selectedDevice: [],
    newSelected: [],
    city: localStorage.getItem('city') ? localStorage.getItem('city') : '',
    isCity: localStorage.getItem('city') ? false : true,
    currentUser: localCurrentUser ? JSON.parse(localCurrentUser) : {},
    isUser: localCurrentUser ? true : false,
    searchResult: sessionSR ? JSON.parse(sessionSR) : []
}