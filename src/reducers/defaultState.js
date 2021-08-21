import {laptopBrands, phoneBrands, computerBrands, 
    smartSpeakerBrands, smartWatchbrands, tvBrands, gamingGadgetBrands, cameraBrands
} from '../components/Pages/PhoneData'

export const defaultState = {
    toggle: false,
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
    city: '',
    isCity: true
}