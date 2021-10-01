
import {laptopBrands, phoneBrands, computerBrands, 
    smartSpeakerBrands, smartWatchbrands, tvBrands, gamingGadgetBrands, cameraBrands
} from '../components/Pages/PhoneData'
import appl from '../assets/tecnoSpark4.jpg'
const localCurrentUser = localStorage.getItem('user')
const sessionSR = sessionStorage.getItem('result')
const selectedDevice = JSON.parse(localStorage.getItem('userSelected'))
export const defaultState = {
    toggle: false,
    modalContent: '',
    isModal: false,
    usedGadgets: [],
    allGadgets: [{img: appl,id: 1, name: 'iphone 6', price: 45000, brand: 'apple', category: 'phones'},
{img: appl ,id: 2, name: 'iphone 11', price: 66000, brand: 'tecno', category: 'phones'}],
    phoneBrands: phoneBrands,
    laptopBrands: laptopBrands,
    computerBrands: computerBrands,
    smartSpeakerBrands: smartSpeakerBrands,
    smartWatchbrands: smartWatchbrands,
    tvBrands: tvBrands,
    gamingGadgetBrands: gamingGadgetBrands,
    cameraBrands: cameraBrands,
    selectedDevice: selectedDevice ?[ selectedDevice] : [],
    newSelected: [],
    city: localStorage.getItem('city') ? localStorage.getItem('city') : '',
    isCity: localStorage.getItem('city') ? false : true,
    isMainCity: false,
    currentUser: localCurrentUser ? JSON.parse(localCurrentUser) : {},
    isUser: true,//localCurrentUser ? true : false,
    searchResult: sessionSR ? JSON.parse(sessionSR) : [],
    repairDataAdmin: []
}