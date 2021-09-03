import {laptopBrands, phoneBrands, computerBrands, 
    smartSpeakerBrands, smartWatchbrands, tvBrands, gamingGadgetBrands, cameraBrands
} from '../components/Pages/PhoneData'

const localCurrentUser = localStorage.getItem('user')
export const defaultState = {
    toggle: false,
    modalContent: '',
    isModal: false,
    phones: [],
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
    isUser: localCurrentUser ? true : false
}
