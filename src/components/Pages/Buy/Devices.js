import React, {useState} from 'react'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../../../reducers/context'
import Skeleton from 'react-loading-skeleton'
const Devices = ({phones, brand}) => {
   
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
   
const history = useHistory()
const {path, url} = useRouteMatch()
const {state} = GlobalContext()
const [loaded, setLoad] = useState(false)
console.log(state, path, history)
    return (
        <div>
             <div className='grid-item-container'>
        {loaded ? null : <div style={{position: 'relative', zIndex: '200', paddingTop: '20px', paddingBottom: '20px'}}> <Skeleton height={70} width={50}/></div> }
            {phones.filter((item) => item.brand === brand).map((item, index) => {
                 return(
                    <Link to={`${url + '/' + item.id + item.name.toLowerCase().replace(/ /g, '-') }`}  key={index}>
                        {loaded ? null : <div style={{position: 'relative', zIndex: '200', paddingTop: '20px', paddingBottom: '20px'}}> <Skeleton height={70} width={50}/></div> }
                    <div className='grid-item-item' onClick={null} onLoad={()=> setLoad(true)}>
                        <div className='grid-img'>  <img src={item.img} alt='ige' /> </div>
                       <span> {item.name}</span>
                       <div>{item.brand}</div>        
                       </div> 
                       </Link>
                )
            })}
        </div>
        </div>
    )
}

export default Devices
