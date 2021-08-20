import React, {useEffect, useState} from 'react'
import sell from '../../assets/sell 2.png'
import './PhoneBrands.css'
import { Link, Route, useRouteMatch, Switch, useHistory } from 'react-router-dom'
import Devices from './subPages/Devices'
import { GlobalContext } from '../../reducers/context'
import HowItWorks from '../HowItWorks'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const PhoneBrands = ({brands, device}) => {
    const {state} = GlobalContext()
 const [brand, setBrand] = useState('')
 const history = useHistory()

    const {path, url} = useRouteMatch()
  const getMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if(/windows phone/i.test(userAgent)){
          setBrand('windows')
          console.log('windows')
      }
      if(/android/i.test(userAgent)){
          setBrand('android')
        console.log('android')
    }
    if(/iPad| iPhone/i.test(userAgent) && !window.MSStream){
        setBrand('apple')
        console.log('ios')
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
<div style={{ backgroundColor: 'white', padding: '6px', fontSize: '20px'}} onClick={() => history.goBack()}><AiOutlineArrowLeft/></div>
        <div className='brand-container'>

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
        <Link to={`${path+ `${'/all-'+ device + '-brands'}`}`}>
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
                <Devices deviceName='Apple phone' phones={state.phoneData} brand='apple'/>
            </Route>
            <Route path={`${path + '/samsung-phones'}`}>
                <Devices deviceName='Samsung Phone' phones={state.phoneData} brand='samsung'/>
            </Route>
            <Route path={`${path + '/tecno-phones'}`}>
                <Devices deviceName='Tecno Phone' phones={state.phoneData} brand='tecno'/>
            </Route>
            <Route path={`${path + '/infinix-phones'}`}>
                <Devices deviceName='Infinix Phone' phones={state.phoneData} brand='infinix'/>
            </Route>
        </Switch>
      
    )
}

export default PhoneBrands
