import React from 'react'
import './Devices.css'
import {BsPhone} from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
import { useHistory, useRouteMatch } from 'react-router-dom'
import HowItWorks from '../../HowItWorks'
import { GlobalContext } from '../../../reducers/context'
import {Switch, Route, Link} from 'react-router-dom'
import DeviceDetails from './DeviceDetails'

const Devices = ({deviceName, phones, brand}) => {
    const {getDevice} = GlobalContext()
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
   
const history = useHistory()
const {path, url} = useRouteMatch()
const {state} = GlobalContext()
const s = 'saq'
s.replace('s', 'v')
console.log(s)
    return (
      
        <div className="item-page">
               <div  className="item-page-header" id="top2">
                <AiOutlineArrowLeft onClick={() => history.goBack()}/>
                <AiOutlineSearch/>
            </div>
              <Switch>
                  <Route exact path={path}>
            <p style={{textAlign: 'center', fontWeight: 'bolder', marginTop: '100px'}}>{deviceName}</p>
        <div className='grid-item-container'>
            {phones.filter((item) => item.brand === brand).map((item, index) => {
                 return(
                    <Link to={`${url + '/'+ item.name.toLowerCase().replace(/ /g, '-')}`}  key={index}>
                    <div className='grid-item-item' onClick={() => getDevice(item)}>
                        <div className='grid-img'><BsPhone/></div>
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
        <HowItWorks/>
        </div>
    )
}

export default Devices
