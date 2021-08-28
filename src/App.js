
import {BrowserRouter as Router,  Switch, Route } from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import MobileNav from './components/MobileNav'
import './App.css';
import BuyItem from './components/Pages/BuyItem';
import SellItem from './components/Pages/SellItem';
import SwapItem from './components/Pages/SwapItem';
import RepairDevice from './components/Pages/RepairDevice';
import Admin from './Admin'
import { GlobalShop } from './components/Pages/Buy/CartContext'
import StatusModal from './components/StatusModal'


const App = ({hideLoader}) => {
 
  React.useEffect(()=> {
    window.scrollTo(0,0)
})
React.useEffect(hideLoader, [hideLoader])
const {state} = GlobalShop()
  return (
    <div >
      <Router forceRefresh={false}>
      <Header/>
      {state.isModal &&  <StatusModal modalContent={state.modalContent}/>}
     <MobileNav/>
      <Switch>
        <Route exact path='/'>
        <Home/>
        </Route>
        <Route path='/sell-item'>
          <SellItem/>
         </Route> 
        <Route path='/buy-item'>
          <BuyItem/>
        </Route>
        <Route path='/swap-item'>
          <SwapItem/>
        </Route>
        <Route path='/repair-device'>
          <RepairDevice/>
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path='/*'>
          Page not found $)$
        </Route>
       
      </Switch>
      </Router>

    </div>
  )
}

export default App;
