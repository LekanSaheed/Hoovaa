import React, {useState} from 'react'
import { useRouteMatch, Link, Route, Switch } from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import { GlobalShop } from './CartContext'
import GadgetDetails from './GadgetDetails'
import './Devices.css'
const Devices = ({phones, brand}) => {
   
   
   
const {path, url} = useRouteMatch()
const {viewDevice, state} = GlobalShop()
const [loaded, setLoad] = useState(false)

React.useEffect(() => {
    window.scrollTo(0,0)
    
}, [])
    return (
        <div>
           <Switch>
               <Route exact path={path}>
               <div className='grid-item-container'>
                   {loaded ? null :<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0', right: '0',
                left: '0', bottom: '0', width: '100%'}}>
                        <CircularProgress/></div>}
            {phones.filter((item) => item.brand === brand).map((item, index) => {
                 return(
                    <Link to={`${url + '/' + item.id + item.name.toLowerCase().replace(/ /g, '=?') }`}  key={index}>
                        
                    <div className='grid-item-item' onClick={() => viewDevice(item)} onLoad={()=> setLoad(true)}>
                        <div className='grid-img'>  <img src={item.img} alt='ige' /> </div>
                       <span> {item.name}</span>
                       <div>{item.brand}</div>        
                       </div> 
                       </Link>
                )
            })}
        </div>
               </Route>
               <Route path={`${path + '/:id'}`}>
                 <GadgetDetails device={state.clickedDevice}/>
               </Route>
           </Switch>
        </div>
    )
}

export default Devices
