import React, {useReducer, useContext} from 'react'
import {defaultState} from './defaultState'
import {reducer} from './reducer'
const AppContext = React.createContext()


const GlobalContext = () => {
    return useContext(AppContext)
}

const AppProvider = ({ children }) => {
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
const setDeviceStorage = (n,s) => {
    dispatch({type: 'SET_DEVICE_STORAGE', payload: n, payload2:s})
}
    return(
        <AppContext.Provider value={{
            state, toggleNav, closeNav, getDevice, setDeviceStorage
        }}>{children}</AppContext.Provider>
    )
}

export  {AppProvider, GlobalContext};