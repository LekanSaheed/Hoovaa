import React, {useState} from 'react'
import { useRouteMatch, Link, Route, Switch } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { GlobalShop } from './CartContext'
import GadgetDetails from './GadgetDetails'
import './Devices.css'
const Devices = ({phones, brand}) => {
   
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
   
const {path, url} = useRouteMatch()
const {viewDevice, state} = GlobalShop()
const [loaded, setLoad] = useState(false)
    return (
        <div>
           <Switch>
               <Route exact path={path}>
               <div className='grid-item-container'>
        {loaded ? null : <div style={{position: 'relative', zIndex: '200', paddingTop: '20px', paddingBottom: '20px'}}> <Skeleton height={70} width={50}/></div> }
            {phones.filter((item) => item.brand === brand).map((item, index) => {
                 return(
                    <Link to={`${url + '/' + item.id + item.name.toLowerCase().replace(/ /g, '=?') }`}  key={index}>
                        {loaded ? null : <div style={{position: 'relative', zIndex: '200', paddingTop: '20px', paddingBottom: '20px'}}> <Skeleton height={70} width={50}/></div> }
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
