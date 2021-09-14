import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import business from '../assets/business.png'
import './MoreDetails.css'


const MoreDetails = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            [theme.breakpoints.up(767)]: {
                flexDirection: 'row-reverse',
                padding: '20px',
                gap: '40px'
            }
        },

    }))
    const classes = useStyle()
    return (
        <Box display='flex' className={classes.root} flexDirection='column'>
            <div className='img-container'>
                <img src={business} alt='logo'/>
            </div>
            <Box padding='10px'>
               We Have Well over 100s of millions of people trading with us, why not join the train?
            </Box>
        </Box>
    )
}

export default MoreDetails
