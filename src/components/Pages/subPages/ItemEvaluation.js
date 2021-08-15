import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { GlobalContext } from '../../../reducers/context'
import "./ItemEvaluation.css"
import {AiOutlineArrowRight} from 'react-icons/ai'
const ItemEvaluation = () => {
  
    React.useEffect(()=> {
        window.scrollTo(0,0)
        document.querySelector('.loader-container').classList.remove('loader-hide')
       setTimeout(()=> {
        document.querySelector('.loader-container').classList.add('loader-hide')
       }, 2000)
    }, [])
    const {state} = GlobalContext()
    const {url, path} = useRouteMatch()
    return (
       <Switch>
           <Route exact path={path}>
           <div>
        {state.newSelected === [] ?  <div>evaluating perfect price for you</div>: state.newSelected.map(item => {
    return(
        <div>
            <img src={item.img} alt='device'/>
          <div> Name {item.name}</div>
           <div>Evaluated at {item.evaluated}</div>
           <Link className="eval-btn" to={`${url + '/user-device-info'}`}>See exact Value<AiOutlineArrowRight/></Link>
        </div>
    )
}) }
        </div>
           </Route>
           <Route path={`${path+'/user-device-info'}`}>
               My info
           </Route>
       </Switch>
    )
}

export default ItemEvaluation
