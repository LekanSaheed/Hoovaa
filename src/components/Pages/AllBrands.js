import { Paper } from '@material-ui/core'
import React from 'react'
import {data} from './allBrandData'

const AllBrands = ({device}) => {
    console.log(device)
    
    return (
       <Paper>
            <div className='centered-text'>
            All {device} brands
       
        </div>

{React.Children.toArray(

    data.filter(i =>  i.category.filter(cat => cat)  === device).map(item => {
        
       return(
          <div>
           <img src={item.img} alt='some randoms'/>
         </div> 
       )
    })
)}
       </Paper>
    )
}

export default AllBrands
