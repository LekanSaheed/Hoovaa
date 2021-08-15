import React from 'react'
import { brands } from './PhoneData'
import './PhoneBrands.css'
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import ApplePhones from './subPages/ApplePhones'
const PhoneBrands = () => {

    const {path, url} = useRouteMatch()
    console.log('brand', path)
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
        </div>
     </Route>
            <Route  path={`${path + '/apple-phones'}`}>
                <ApplePhones/>
            </Route>
        </Switch>
      
    )
}

export default PhoneBrands
