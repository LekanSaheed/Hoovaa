import React, { useState } from 'react'
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
    const [selectedStorage, setSelected] = useState(null)
    console.log(path)

    return (
        <Switch>
            <Route exact path={path}>

        <div className='device-details-page'>
            {device.map((item, index) => {
                return(
                    <div key={index}>
                       <div className='grid-img'> <img src={item.img} alt='brand'/></div>
                        <div className='device-name'>{item.name}</div>
                        <div className='device-brand'>{item.brand}</div>
                        <span className='theme-text'>Select storage</span>
                        <div className='grid-item-container storage-grid'>
                        {item.storage.map((storage, id) => {
                            return(
                                <div className='grid-item-storage' key={id}>
                                    <input type="radio" name='deviceStorage' value={storage} onChange={(e) => setSelected(e.target.value)}
                                    /> {storage}GB
                                </div>

                            )
                        })}
                        </div>
                        <Link  to={`${url +  '/evaluation'}`} onClick={() => setTimeout(() =>
                             {setDeviceStorage(item.name+ ' ' + selectedStorage + 'GB', item.brandImg, item.price)}, 3000)}> 
                        <button style={{backgroundColor: `${!selectedStorage ? 'lightblue' : '#7497ff'}`}} className='btn-eval' disabled={!selectedStorage} >Continue</button> </Link>
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
