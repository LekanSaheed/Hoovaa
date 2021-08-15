import React, {useEffect, useState} from 'react'
import { brands } from './PhoneData'
import './PhoneBrands.css'
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import ApplePhones from './subPages/ApplePhones'

const PhoneBrands = () => {
const [brand, setBrand] = useState('')

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
     window.addEventListener('resize', () => {
        getMobile()
       
     })
  }, [])
 
    return (
        <Switch>
<Route exact path={path}>       
        <div className='brand-container'>
           <span style={{fontWeight: '500'}}> Choose your Phone brand or Search</span>
            <div className="search-container brand-search">
                <input type='search' placeholder='search phone brand or name'/>
                search
            </div>
            <div className='brand-container-flex'>
           
           
            {brands.map((item, index) => {
                return(
                   <Link to={url+item.to}> <img key={index} src={item.img} alt='brands'/></Link>
                )
            })}
        </div>
       <div style={{fontWeight: "600"}}> Sell your <span>{brand}</span> phone</div>
       {brand && brands.map(item => {
           return(
               <div>
                   {item.brand === brand && <Link to={url+ item.to}><img src={item.img} alt={item.brand}/></Link>}
                </div>   
           )
       }) 
        }
        </div>

     </Route>
            <Route  path={`${path + '/apple-phones'}`}>
                <ApplePhones/>
            </Route>
        </Switch>
      
    )
}

export default PhoneBrands
