import React, {useReducer, useContext, useEffect, } from 'react'
import {defaultState} from './defaultState'
import {db} from '../components/firebase'
import {reducer} from './reducer'

const AppContext = React.createContext()

const GlobalContext = () => {
    return useContext(AppContext)
}

const AppProvider = ({ children }) => {


    const getPhones = () => {
        const data = []
        db.collection('phones').get().then(querySnapshot => {
           querySnapshot.forEach((doc) => {
               data.push(doc.data())
               dispatch({type: 'SET_PHONES', payload: data})
           })
            
        }).catch(err => {
            console.log(err)
        })
       
    }
    useEffect(() => {
        getPhones()
    }, [])
const [state, dispatch] = useReducer(reducer, defaultState)

const toggleNav = () => {
    dispatch({type: 'TOGGLE_NAV'})
}
const closeNav = () => {
    dispatch({type: 'CLOSE_NAV'})

}
const getDevice = (item) => {
    dispatch({type: 'SET_SELECTED_DEVICE', payload: item})
}
const setDeviceStorage = (n,s, p) => {
    dispatch({type: 'SET_DEVICE_STORAGE', payload: n, payload2:s, payload3:p})
}
const setCity = (city) => {
    dispatch({type: "SET_CITY", payload: city})
}
    return(
        <AppContext.Provider value={{
            state, toggleNav, 
            closeNav, getDevice,
             setDeviceStorage, setCity
        }}>{children}</AppContext.Provider>
    )
}

export  {AppProvider, GlobalContext};