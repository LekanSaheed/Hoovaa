
import React from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import {Link, Route, useHistory, useRouteMatch, Switch} from 'react-router-dom'
import buy from '../../../assets/trolley.png'
import { GlobalContext } from '../../../reducers/context'
import Devices from './Devices'

const Brands = ({brands, device}) => {
    const {state} = GlobalContext()
    const {path, url} = useRouteMatch()
    const history = useHistory()
    return (
        <Switch>
            <Route exact path={path}>
            <div>
            
            <div className='brand-container'>
            <div style={{alignSelf: 'flex-start',
        margin: '0px 15px'}} onClick={() => history.goBack()}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', color: 'grey'}}><FiArrowLeftCircle/>
                <span style={{marginLeft: '5px', fontSize: '11px'}} >Go Back</span>
                </div>
                </div>
                <div className='centered-text' style={{marginTop: '15px'}}><img src={buy} alt='buy'/></div>
                <div className="search-container brand-search">
                    <input type='search' placeholder={`${'Search ' + device + ' or brands'}`}/>
                    <div style={{fontSize: '10px', fontWeight: '600', color: 'white', padding: '12px', backgroundColor: '#7497ff'}}>Search</div>
                </div>
               <div className='line-through'> <div></div>
               <span style={{fontWeight: '300', fontSize: '11px', padding: '13px'}}> Or choose {device} brand</span>
               <div>
                   </div>
               </div>
             
                <div className='brand-container-flex'>
               
               
                {brands.map((item, index) => {
                    return(
                       <Link key={index} to={url+item.to}> <img className='brand-img' src={item.img} alt='brands'/></Link>
                    )
                })}
            </div>
            <Link to={`${path+ `${'/all-'+ device + '-brands'}`}`}>
                <div>See all Brands</div>
            </Link> 
             </div>
            </div>
            </Route>

            <Route path={path + '/apple-phones'}>
               <Devices phones={state.phones} brand='apple'/>
                </Route>
                <Route path={path + '/samsung-phones'}>
               <Devices phones={state.phones} brand='samsung'/>
                </Route>
                <Route path={path + '/tecno-phones'}>
               <Devices phones={state.phones} brand='tecno'/>
                </Route>
                <Route path={path + '/infinix-phones'}>
               <Devices phones={state.phones} brand='infinix'/>
                </Route>
                <Route path={path + '/apple-phones'}>
               <Devices phones={state.phones} brand='apple'/>
                </Route>
        </Switch>
        
    )
}

export default Brands
