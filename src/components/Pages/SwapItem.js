import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import Gadget from './Swap/Gadget'
import SwapGadget from './Swap/SwapGadget'


const SwapItem = () => {
    const {path} = useRouteMatch()
    const swaplink = sessionStorage.getItem('swaplink')
    const swapItem = JSON.parse(localStorage.getItem('swap-item'))
    return (
        <Switch>
                <Route path={path} exact>
                    <SwapGadget/>
                </Route>
                <Route path={swaplink && swaplink}>
                    <Gadget gadget={swapItem && swapItem.text}/>
                </Route>
        </Switch>

    )
}

export default SwapItem
