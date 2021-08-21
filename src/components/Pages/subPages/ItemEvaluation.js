import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { GlobalContext } from '../../../reducers/context'
import "./ItemEvaluation.css"
import {AiOutlineArrowRight} from 'react-icons/ai'
import DeviceQuestionnaire from './DeviceQuestionnaire'
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
    const [loaded, setLoad] = React.useState(false)
    return (
       <Switch>
           <Route exact path={path}>
           <div style={{paddingTop: '20px'}}>
               {state.newSelected.map((item, id) => {
                   return(
                       <div key={id} style={{margin: '12px', fontSize: '25px', fontWeight: '500'}}> Sell your {item.name}</div>
                   )
               })}
        { state.newSelected.map(item => {
    return(
        <div className='flex-display-eval' >
            {loaded ? null : 'loading'}
            <img src={item.img} alt='device' onLoad={() => setLoad(true)}/>
        <div>  <div style={{fontSize: '14px', fontWeight: '500'}}> {item.name}</div>
           <div style={{ fontSize: '12px'}}>Evaluated at</div>
           <div style={{color: '#7497ff', fontSize: '20px'}}>{item.evaluated.toLocaleString() + ' Naira'}</div>
            <div style={{fontSize:'11px'}}><span className='theme-text'>{Math.floor(Math.random(150) * 10) + 1}k+ </span>of this sold on <span className='theme-text'>Hoovah</span></div>
           </div>
           <Link className="eval-btn" to={`${url + '/user-device-info'}`}>See exact Value<AiOutlineArrowRight/></Link>
        </div>
    )
})}
        </div>
           </Route>
           <Route path={`${path+'/user-device-info'}`}>
               <DeviceQuestionnaire/>
           </Route>
       </Switch>
    )
}

export default ItemEvaluation
