import React, { useState } from 'react'
import './Devices.css'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
import { useHistory, useRouteMatch } from 'react-router-dom'
import HowItWorks from '../../HowItWorks'
import { GlobalContext } from '../../../reducers/context'
import {Switch, Route, Link} from 'react-router-dom'
import DeviceDetails from './DeviceDetails'
import { CircularProgress } from '@material-ui/core'
const Devices = ({deviceName, phones, brand}) => {
    const {getDevice} = GlobalContext()
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
   
const history = useHistory()
const {path, url} = useRouteMatch()
const {state} = GlobalContext()
const [loaded, setLoad] = useState(false)

React.useEffect(() => {
    const loader = document.querySelector('.loader-container')
    !loaded ? loader.classList.remove('loader-hide') : loader.classList.add('loader-hide')
},[loaded])
    return (
      
        <div className="item-page">
               <div  className="item-page-header" id="top2">
                <AiOutlineArrowLeft onClick={() => history.goBack()}/>
                <AiOutlineSearch/>
            </div>
              <Switch>
                  <Route exact path={path}>
            <p style={{textAlign: 'center', fontWeight: 'bolder', marginTop: '10px'}}>Sell your old {deviceName}</p>
        <div className='grid-item-container'>
        {loaded ? null :<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:
         'absolute', top: '30px', right: '0',
                left: '0', bottom: '0', width: '100%', zIndex: '1'}}>
                        <CircularProgress/></div>}
            {phones.filter((item) => item.brand === brand).map((item, index) => {
                 return(
                     
                    <Link to={`${url + '/' + item.id + item.name.toLowerCase().replace(/ /g, '-') }`}  key={index}>
                    <div className='grid-item-item' onClick={() => getDevice(item)} onLoad={()=> setLoad(true)}>
                        <div className='grid-img'>  <img src={item.img} alt='ige' /> </div>
                        {loaded && <> <span> {item.name}</span></>}
                       <div>{item.brand}</div>        
                       </div> 
                       </Link>
                )
            })}
        </div>
        </Route>
        <Route path={`${path + '/:id'}`}>
            <DeviceDetails device={state.selectedDevice}/>
        </Route>
        </Switch>
        <HowItWorks mTop="0"/>
        </div>
    )
}

export default Devices
