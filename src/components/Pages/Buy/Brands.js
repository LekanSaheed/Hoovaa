
import React, {useState} from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import {Link, Route, useHistory, useRouteMatch, Switch} from 'react-router-dom'
import buy from '../../../assets/trolley.png'
import AllBrands from '../AllBrands'
import Devices from './Devices'

const Brands = ({brands, device}) => {
    const {path, url} = useRouteMatch()
    const history = useHistory()
    const [brand, setBrand] = useState('')
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
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
                       <Link key={index} to={url+item.to}> <img className='brand-img' src={item.img} alt='brands' onClick={() => {
                           setBrand(item.brand)
                       }}/></Link>
                    )
                })}
            </div>
            <Link to={`${path+ `${'/all-'+ device.toLowerCase().replace(/ /g, '-') + '-brands'}`}`}>
                <div>See all Brands</div>
            </Link> 
             </div>
            </div>
            </Route>
                {/* all brands */}
                <Route  path={path + '/all-' + device.toLowerCase().replace(/ /g, '-') + '-brands'} >
                   <AllBrands brand={brand} device={device}/>   
                </Route>
          
                {/* Phones */}
            <Route path={path + '/apple-phones'}>
               <Devices category  brand='apple'/>
                </Route>
                <Route category path={path + '/samsung-phones'}>
               <Devices  brand='samsung'/>
                </Route>
                <Route category path={path + '/tecno-phones'}>
               <Devices  brand='tecno'/>
                </Route>
                <Route category path={path + '/infinix-phones'}>
               <Devices  brand='infinix'/>
                </Route>

               {/* Laptops */}
<Route path={path + '/apple-laptops'}>
               <Devices category='laptops'  brand='apple'/>
                </Route>
                <Route category='laptops' path={path + '/hp-laptops'}>
               <Devices  brand='hp'/>
                </Route>
                <Route category='laptops' path={path + '/toshiba-laptops'}>
               <Devices  brand='toshiba'/>
                </Route>
                <Route category='laptops' path={path + '/dell-laptops'}>
               <Devices  brand='dell'/>
                </Route>

               {/* Tvs */}
<Route path={path + '/toshiba-tvs'}>
               <Devices category='tvs'  brand='apple'/>
                </Route>
                <Route category='tvs' path={path + '/philips-tvs'}>
               <Devices  brand='philips'/>
                </Route>
                <Route category='tvs' path={path + '/panasonic-tvs'}>
               <Devices  brand='panasonic'/>
                </Route>
                <Route category='tvs' path={path + '/samsung-tvs'}>
               <Devices  brand='philips'/>
                </Route>
               {/* Home Appliances */}
               <Route path={path + '/apple-phones'}>
               <Devices category='homeAppliances'  brand='apple'/>
                </Route>
                <Route category='homeAppliances' path={path + '/samsung-phones'}>
               <Devices  brand='samsung'/>
                </Route>
                <Route category='homeAppliances' path={path + '/tecno-phones'}>
               <Devices brand='tecno'/>
                </Route>
                <Route category='homeAppliances' path={path + '/infinix-phones'}>
               <Devices  brand='infinix'/>
                </Route>
               {/* Gaming */}

               <Route category='gamingGadgets' path={path + '/microsoft-consoles'}>
               <Devices  brand='microsoft'/>
                </Route>
                <Route category='gamingGadgets' path={path + '/sony-consoles'}>
               <Devices  brand='sony'/>
                </Route>
        </Switch>
        
    )
}

export default Brands
