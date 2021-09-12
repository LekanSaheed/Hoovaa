import { Box, CardMedia, makeStyles } from '@material-ui/core'
import React from 'react'
import { GlobalShop } from '../components/Pages/Buy/CartContext'

const RecentlyViewed = () => {
   const useStyle = makeStyles(theme => ({
       root: {
           
       },
       grids: {
           overflow: 'scroll'
       }
   }))
   const classes = useStyle()
    const {state} = GlobalShop()
    const recent = state.recentlyViewed.length > 5 ? state.recentlyViewed : state.recentlyViewed
    return (
        <div>
            <h5>Recently Viewed</h5>
           <Box className={classes.grids} display='flex'> {state.recentlyViewed.length === 0 ? 'Recently viewed Items will appear here' : 
           recent.map((item, idx) => {
                return(
                    <li key={idx}>
                       <Box display='flex' flexDirection='column' margin='10px' alignItems='center'>
                       <CardMedia children={<img style={{width: '120px'}} alt='product' src={item.img}/>}/>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                       </Box>
                    </li>
                )
            })
            }</Box>
        </div>
    )
}

export default RecentlyViewed
