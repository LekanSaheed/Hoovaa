import React, { useState } from 'react'
import './Devices.css'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
import { useHistory, useRouteMatch } from 'react-router-dom'
import HowItWorks from '../../HowItWorks'
import { GlobalContext } from '../../../reducers/context'
import {Switch, Route, Link} from 'react-router-dom'
import DeviceDetails from './DeviceDetails'
import Skeleton from 'react-loading-skeleton'
const Devices = ({deviceName, phones, brand}) => {
    const {getDevice} = GlobalContext()
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
   
const history = useHistory()
const {path, url} = useRouteMatch()
const {state} = GlobalContext()
const [loaded, setLoad] = useState(false)
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
            {phones.filter((item) => item.brand === brand).map((item, index) => {
                 return(
                    <Link to={`${url + '/' + item.name.toLowerCase().replace(/ /g, '-')}`}  key={index}>
                    <div className='grid-item-item' onClick={() => getDevice(item)}>
                        <div className='grid-img'>{loaded ? null : <Skeleton height={100}/> }  <img src={item.img} alt='ige' onLoad={() => setLoad(true)}/> </div>
                       <span> {item.name}</span>
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
