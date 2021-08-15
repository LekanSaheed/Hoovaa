import React from 'react'
import './DeviceDetails.css'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
import ItemEvaluation from './ItemEvaluation'
import { GlobalContext } from '../../../reducers/context'

const DeviceDetails = ({device}) => {
    React.useEffect(()=> {
        window.scrollTo(0,0)
    }, [])
    const {path, url } = useRouteMatch()
    const {setDeviceStorage} = GlobalContext() 
    const newStorage = 24
    return (
        <Switch>
            <Route exact path={path}>

        <div className='device-details-page'>
            {device.map((item, index) => {
                return(
                    <div key={index}>
                        <img src={item.brandImg} alt='brand'/>
                        <div className='device-name'>{item.name}</div>
                        <div className='device-brand'>{item.brand}</div>
                        select storage
                        {item.storage.map((storage, id) => {
                            return(
                                <div key={id}>
                                    <input type="radio"/>{storage}
                                </div>

                            )
                        })}
                        <Link to={`${url + '/evaluation'}`} onClick={() => setTimeout(() => {setDeviceStorage(item.name+ ' ' + newStorage, item.brandImg)}, 3000)}> Continue </Link>
                    </div>
                   
                )
            })}
        </div>
        </Route>
        <Route path={`${path + '/evaluation'}`}>
            <ItemEvaluation/>
        </Route>
        </Switch>
    )
}

export default DeviceDetails
