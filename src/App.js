
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import MobileNav from './components/MobileNav'
import './App.css';
import BuyItem from './components/Pages/BuyItem';
import SellItem from './components/Pages/SellItem';
import SwapItem from './components/Pages/SwapItem';
import RepairDevice from './components/Pages/RepairDevice';
const App = () => {

  return (
    <div>
      <Router>
      <Header/>
    
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

      </Switch>
      </Router>

    </div>
  )
}

export default App;
