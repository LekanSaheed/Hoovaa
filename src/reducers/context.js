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
    console.log('working', state.toggle)
}
const closeNav = () => {
    dispatch({type: 'CLOSE_NAV'})
    console.log('did')
}
    return(
        <AppContext.Provider value={{
            state, toggleNav, closeNav
        }}>{children}</AppContext.Provider>
    )
}

export  {AppProvider, GlobalContext};