import React from 'react'
import './Cities.css'
import {GlobalContext} from '../reducers/context'
import Skeleton from 'react-loading-skeleton'
import {Modal, Dialog, DialogTitle} from '@material-ui/core'
import {db} from './firebase'
const Cities = () => {
  

    const {setCity, state} = GlobalContext()
 const [cities, setCities] = React.useState([])
const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {
        const loader = document.querySelector('.loader-container')
    loading && loader.classList.remove('loader-hide')
        db.collection('cities').doc('nigerian_cities').get().then(doc => {
            const myCities = []
               myCities.push(doc.data())
              const newCity = myCities[0].data.filter(item => item.state === 'Lagos') //.filter((city) => city.state === 'Lagos')
              setCities(newCity)
        }).then(()=> {
            setLoading(false)
            loader.classList.add('loader-hide')
        })
        .catch(err => {
            console.log(err)
        })
        return () => {

        }
    }, [setCities, setLoading, loading])
  
 
   const cityComp = cities.map(item => {
    const size = 12
    const totalToShow = item.lgas.slice(0, size)
       return(
           <div className='city-grid'>
               {totalToShow.map((n, idx) => {
               
              
                   return(
                       <div key={idx} className='cities' onClick={() => setCity(n)}>
                       {n}
                       </div>
                   )
               })}
               <div>
           <input type="search"/>
           <span style={{color: 'black'}}>View All cities</span>
           </div>
           </div>
       )

       
   })
   
    return (
        <div>
          <Modal children={<Dialog children={<div> <DialogTitle children={<>CHOOSE A CITY TO CONTINUE</>}/>
           {loading ? <div style={{padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <Skeleton count={12} className="city-grid" width={100} height={40} style={{margin: '10px'}}/></div> : cityComp} </div>} fullWidth={true} maxWidth='lg' open={state.isCity} />} 
           open={state.isCity}/>
        </div>
    )
}

export default Cities
