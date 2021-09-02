import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {makeStyles} from '@material-ui/core/styles'
import {AiOutlineHome} from 'react-icons/ai'
import * as Fa from 'react-icons/fa'

const BottomNav = () => {
    const useStyles = makeStyles({
        root: {
            width: '100%',
            boxShadow: '0 2px 10px 0 rgba(0 0 0 /15%)',
            fontColor: '#fff',
            fontWeight: 'bold',
            fontSize: '19px',
            // left: '10px',
            // right: '10px',

            borderRadius: '20px'
        },
        selected: {
            color: 'white'
        }
    })

    const classes = useStyles();
    const [value, setValue] = React.useState('home')
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
       <div style={{position: 'fixed', bottom: '0', width: '100%', padding: '10px'}}>
            <BottomNavigation value={value} onChange={handleChange}  style={{color: 'white'}} className={classes.root}>
            <BottomNavigationAction label="Buy" value="buy" icon={<Fa.FaHandHoldingUsd/>}/>
            <BottomNavigationAction label="Sell" value="sell" icon={<Fa.FaDollarSign/>}/>
            <BottomNavigationAction label="Home" value="home" icon={<AiOutlineHome/>}/>
            <BottomNavigationAction label="Repair" value="repair" icon={<Fa.FaTools/>}/>
            <BottomNavigationAction label="Profile" value="profile" icon={<Fa.FaUser/>}/>
        </BottomNavigation>
       </div>
    )
}

export default BottomNav
