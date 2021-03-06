import React, {useEffect, useState} from 'react'
import sell from '../../assets/sell 2.png'
import './PhoneBrands.css'
import { Link, Route, useRouteMatch, Switch, useHistory } from 'react-router-dom'
import Devices from './subPages/Devices'
import { GlobalContext } from '../../reducers/context'
import HowItWorks from '../HowItWorks'
import { FiArrowLeftCircle } from 'react-icons/fi'

const Brands = ({brands, device}) => {
    const {state} = GlobalContext()
 const [brand, setBrand] = useState('')
 const history = useHistory()

    const {path, url} = useRouteMatch()
  const getMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if(/windows phone/i.test(userAgent)){
          setBrand('windows')
      }
      if(/android/i.test(userAgent)){
          setBrand('android')
    }
    if(/iPad| iPhone/i.test(userAgent) && !window.MSStream){
        setBrand('apple')
    }
  }
  useEffect(() => {
      window.scrollTo(0,0)
     window.addEventListener('resize', () => {
        getMobile()
       
     })
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
            <div className='centered-text' style={{marginTop: '15px'}}><img src={sell} alt='sell'/></div>
            <div className="search-container brand-search">
                <input type='search' placeholder={`${'Search your ' + device + ' or brands'}`}/>
                <div style={{fontSize: '10px', fontWeight: '600', color: 'white', padding: '12px', backgroundColor: '#7497ff'}}>Search</div>
            </div>
           <div className='line-through'> <div></div>
           <span style={{fontWeight: '300', fontSize: '11px', padding: '13px'}}> Or choose your {device} brand</span>
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
        <Link to={`${url+ `${'/all-'+ device + '-brands'}`}`}>
            <div>See all Brands</div>
        </Link>
       <div style={{fontWeight: "600"}}> Sell your <span>{brand}</span> {device}</div>
       {brand && brands.map(item => {
           return(
               <div>
                   {item.brand === brand && <Link to={url+ item.to}>
                       <img className='brand-img' src={item.img} alt={item.brand}/>
                       </Link>}
                </div>   
           )
       }) 
        }
         
        
         <HowItWorks bc='#fafafa'/>
         </div>
         
        </div>

     </Route>
            <Route  path={`${path + '/apple-phones'}`}>
                <Devices deviceName='Apple phone' category='phones' gadget={state.usedGadgets} brand='apple'/>
            </Route>
            <Route path={`${path + '/samsung-phones'}`}>
                <Devices deviceName='Samsung Phone' category='phones' gadget={state.usedGadgets} brand='samsung'/>
            </Route>
            <Route path={`${path + '/tecno-phones'}`}>
                <Devices deviceName='Tecno Phone' category='phones' gadget={state.usedGadgets} brand='tecno'/>
            </Route>
            <Route path={`${path + '/infinix-phones'}`}>
                <Devices deviceName='Infinix Phone' category='phones' gadget={state.usedGadgets} brand='infinix'/>
            </Route>
            {/* Laptops */}
            <Route path={`${path + '/hp-laptops'}`}>
                <Devices deviceName='Hp laptop' category='laptops' gadget={state.usedGadgets} brand='hp'/>
            </Route>
            <Route path={`${path + '/apple-laptops'}`}>
                <Devices deviceName='Apple laptop' category='laptops' gadget={state.usedGadgets} brand='apple'/>
            </Route>
            <Route path={`${path + '/toshiba-laptops'}`}>
                <Devices deviceName='Toshiba laptop' category='laptops' gadget={state.usedGadgets} brand='toshiba'/>
            </Route>
            <Route path={`${path + '/dell-laptops'}`}>
                <Devices deviceName='Dell laptop' category='laptops' gadget={state.usedGadgets} brand='dell'/>
            </Route>
            {/* Computers */}

            <Route path={`${path + '/hp-computers'}`}>
                <Devices deviceName='Hp computer' category='computers' gadget={state.usedGadgets} brand='hp'/>
            </Route>
            <Route path={`${path + '/apple-computers'}`}>
                <Devices deviceName='Apple computer' category='computers' gadget={state.usedGadgets} brand='apple'/>
            </Route>
            <Route path={`${path + '/toshiba-computers'}`}>
                <Devices deviceName='Toshiba computer' category='computers' gadget={state.usedGadgets} brand='toshiba'/>
            </Route>
            <Route path={`${path + '/dell-computers'}`}>
                <Devices deviceName='Dell computer' category='computers' gadget={state.usedGadgets} brand='dell'/>
            </Route>

            {/* Gaming gadgets */}
            <Route path={`${path + '/microsoft-consoles'}`}>
                <Devices deviceName='Microsoft Console' category='consoles' gadget={state.usedGadgets} brand='microsoft'/>
            </Route>
            <Route path={`${path + '/sony-consoles'}`}>
                <Devices deviceName='Sony Console' category='consoles' gadget={state.usedGadgets} brand='sony'/>
            </Route>

            {/* TVs */}
            <Route path={`${path + '/toshiba-tvs'}`}>
                <Devices deviceName='Toshiba Tv' category='tvs' gadget={state.usedGadgets} brand='toshiba'/>
            </Route>
            <Route path={`${path + '/samsung-tvs'}`}>
                <Devices deviceName='Samsung Tv' category='tvs' gadget={state.usedGadgets} brand='samsung'/>
            </Route>
            <Route path={`${path + '/philips-tvs'}`}>
                <Devices deviceName='Philips Tv' category='tvs' gadget={state.usedGadgets} brand='philips'/>
            </Route>
            <Route path={`${path + '/panasonic-tvs'}`}>
                <Devices deviceName='Panasonic Tv' category='tvs' gadget={state.usedGadgets} brand='panasonic'/>
            </Route>

            {/* Cameras */}

             <Route path={`${path + '/nikon-cameras'}`}>
                <Devices deviceName='Nikon Tv' category='cameras' gadget={state.usedGadgets} brand='nikon'/>
            </Route>
            <Route path={`${path + '/Canon-cameras'}`}>
                <Devices deviceName='Canon Tv' category='cameras' gadget={state.usedGadgets} brand='nikon'/>
            </Route>
           
sw
            {/* Smart-Watches */}
            <Route path={`${path + '/mi-sw'}`}>
                <Devices deviceName='Mi Smart Watch' category='smartWatches' gadget={state.usedGadgets} brand='mi'/>
            </Route>
            <Route path={`${path + '/apple-sw'}`}>
                <Devices deviceName='Apple Smart Watch' category='smartWatches' gadget={state.usedGadgets} brand='apple'/>
            </Route>
            <Route path={`${path + '/samsung-sw'}`}>
                <Devices deviceName='Samsung Smart Watch' category='smartWatches' gadget={state.usedGadgets} brand='samsung'/>
            </Route>
            <Route path={`${path + '/dell-sw'}`}>
                <Devices deviceName='Dell Smart Watch' category='smartWatches' gadget={state.usedGadgets} brand='dell'/>
            </Route>

            {/* Smart Speakers */}

            <Route path={`${path + '/hp-smart-speakers'}`}>
                <Devices deviceName='Hp Smart Speaker' category='smartSpeakers' gadget={state.usedGadgets} brand='hp'/>
            </Route>
            <Route path={`${path + '/apple-smart-speakers'}`}>
                <Devices deviceName='Apple Smart Speaker' category='smartSpeakers' gadget={state.usedGadgets} brand='apple'/>
            </Route>
            <Route path={`${path + '/samsung-smart-speakers'}`}>
                <Devices deviceName='Samsung Smart Speaker' category='computers' gadget={state.usedGadgets} brand='samsung'/>
            </Route>
            <Route path={`${path + '/dell-smart-speakers'}`}>
                <Devices deviceName='Dell Smart Speaker' category='smartSpeakers' gadget={state.usedGadgets} brand='dell'/>
            </Route>
        </Switch>
      
    )
}

export default Brands
