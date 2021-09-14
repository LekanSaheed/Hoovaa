
import {BrowserRouter as Router,  Switch, Route, Link } from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import MobileNav from './components/MobileNav'
import './App.css';
import BuyItem from './components/Pages/BuyItem';
import SellItem from './components/Pages/SellItem';
import SwapItem from './components/Pages/SwapItem';
import RepairDevice from './components/Pages/RepairDevice';
import Admin from './Admin/Admin'
import { GlobalShop } from './components/Pages/Buy/CartContext'
import StatusModal from './components/StatusModal'
import Login from './Auth/Login'
import Account from './Auth/Account'
import PrivateRoute from './PrivateRoute'
import { GlobalContext } from './reducers/context'
import LogOut from './Auth/LogOut'
import { stateChange } from './components/firebase'
import SignUp from './Auth/SignUp'
import Cart from './components/Pages/Buy/Cart'
import Footer from './components/Footer'
//import smoothscroll from 'smoothscroll-polyfill'
import {db} from './components/firebase'
import SearchPage from './components/SearchPage'
import Catalog from './components/Catalog'
import DataCollection from './reducers/DataCollection'
import { Box, Button } from '@material-ui/core'
import { RiSurveyLine } from 'react-icons/ri'
import Error from './components/Error'

const App = ({hideLoader}) => {

  React.useEffect(()=> {
   
    const unsubscribe =  stateChange()
      return () => {
        unsubscribe()
      }
 
}, [])

React.useEffect(() => {
  const url = 'http://locationsng-api.herokuapp.com/api/v1/lgas'
  fetch(url).then(response => {
      if(response.ok){
         return response.json()
      }
      throw new Error('Error Fetching data')
  }).then(data => {
     db.collection('cities').doc('nigerian_cities').set({data})
  }).catch((err) => {
    console.log(err)
  })
}, [])
React.useEffect(hideLoader, [hideLoader])
const newState = GlobalContext().state

const {state} = GlobalShop()
  return (
    <div >
      <Router forceRefresh={false}>
      <Header/>
      {state.isModal &&  <StatusModal modalContent={state.modalContent}/>}
      {newState.isModal && <StatusModal modalContent={newState.modalContent}/>}
     <MobileNav/>
    
      <Switch>
        <Route exact path='/'>
        <Box display='flex' alignItems='center' justifyContent='space-between' fontSize="13px" padding='10px'>
       <span>Would you like to help take a survey?</span> <Link to='/survey'>
       <Button variant='contained' size='small' color='primary' endIcon={<RiSurveyLine/>}>Take survey </Button></Link></Box>
        <Home/>
        </Route>
        <Route path='/search' component={SearchPage}/>
        <Route path='/sell-item'>
          <SellItem/>
         </Route> 
         <Route path='/catalog/' component={Catalog}/>
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
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/survey' component={DataCollection}/>
        <Route path='/cart' component={Cart}/>
        <PrivateRoute path='/account' isUser={newState.isUser} component={Account}/>
        <PrivateRoute path='/logout' isUser={newState.isUser} component={LogOut}/>
        <PrivateRoute path='/signup' isUser={!newState.isUser} component={SignUp}/>
        <Route path='/*'>
        <Error/>
        </Route>
     

      </Switch>
      <Footer/>
      </Router>

    </div>
  )
}

export default App;
