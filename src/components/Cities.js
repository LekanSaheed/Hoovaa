import React from 'react'
import './Cities.css'
import {GlobalContext} from '../reducers/context'
import Skeleton from 'react-loading-skeleton'
const Cities = () => {
    const url = 'http://locationsng-api.herokuapp.com/api/v1/lgas'

    const {setCity} = GlobalContext()
 const [cities, setCities] = React.useState([])
const [loading, setLoading] = React.useState(true)
     React.useEffect(() => {
        fetch(url).then(response => {
            if(response.ok){
               return response.json()
            }
            throw new Error('sad')
        }).then(data => {
            setCities(data)
            setLoading(false)
            console.log(data)

        })
    }, [])
    
   const cityComp = cities.filter((city) => city.state === 'Lagos').map(item => {
    return(
        <div className='city-grid'>
            {item.lgas.map((lga, idx) => {
                return(
                    <div key={idx} onClick={() => setCity(lga)} className='cities'>
                        {loading ? 'loading' : lga}
                      </div>
                )
            })}
        </div>
    )
})
    return (
        <div>
            <div className='city-modal-container'>
                <div className='city-modal'>
                   <div className='city-container'>
                   <h1>Please Select your city to contine\ue</h1>
                   {loading ? <div>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>

                       </div> : cityComp}
                   </div>
                
                </div>
            </div>
        </div>
    )
}

export default Cities
