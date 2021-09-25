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
        db.collection('gadgets').get().then(querySnapshot => {
           querySnapshot.forEach((doc) => {
               data.push(doc.data())
               dispatch({type: 'SET_PHONES', payload: data})
           })
            
        }).catch(err => {
            console.log(err)
        })
       
    }

    const getRepairData = () => {
        const repairData = []
        const docRef = db.collection('repairs')
        docRef.orderBy('created', 'asc').onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const {name, brand, model, damages, isRepaired, repairId, customerId, personnelReceived,
                     personnelReturned, created,} = doc.data()
                repairData.push({
                    name, brand, model, damages, isRepaired, repairId,
                    personnelReceived, personnelReturned, created,
                    customerId,
                    id: doc.id
                })
               dispatch({type: 'SET_REPAIR_DATA', payload: repairData})
            })
           
        })
    }
    
    const getUsedGadgets = () => {
        const data = []
        db.collection('usedGadgets').get().then(querySnapshot => {
           querySnapshot.forEach((doc) => {
               data.push(doc.data())
               dispatch({type: 'SET_USED_GADGETS', payload: data})
           })
            
        }).catch(err => {
            console.log(err)
        })
       
    }
    useEffect(() => {
        getRepairData()
        getPhones()
        getUsedGadgets()
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
const setUser = (user) => {
    dispatch({type: 'SET_USER', payload: user})
}
const logout = () => {
    dispatch({type: 'LOG_OUT'})
}
const setSearchResult = (item) => {
    dispatch({type: 'SET_SEARCH_RESULT', payload: item})
} 
const setModalStat = (content) => {
    dispatch({type: 'SET_STAT', payload : content})
}
const close = () => {
    dispatch({type: "CLOSE_MODAL"})
}
    return(
        <AppContext.Provider value={{
            state, toggleNav, 
            closeNav, getDevice,
             setDeviceStorage, setCity,
              setUser, logout,
              setSearchResult, setModalStat,
            close
        }}>{children}</AppContext.Provider>
    )
}

export  {AppProvider, GlobalContext};
