import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {makeStyles} from '@material-ui/core/styles'
import {AiOutlineHome} from 'react-icons/ai'
import * as Fa from 'react-icons/fa'
import {Link, useRouteMatch} from 'react-router-dom'

const BottomNav = ({current}) => {
    
    const useStyles = makeStyles(theme => ({
        root: {
            width: 'auto',
            boxShadow: '0 2px 10px 0 rgba(0 0 0 /15%)',
            fontWeight: '500',
            fontSize: '14px',
            display: 'flex',
            paddingTop: '5px',
            borderRadius: '20px',
            color: 'black',
            height: 'auto',
            [theme.breakpoints.down('321')]: {
                fontSize: '10px'
            },
            [theme.breakpoints.up('767')]: {
                display: 'none'
            }
        },
        label: {
            
            fontSize: '10px',
            [theme.breakpoints.down('321')]: {
                fontSize: '9px',
            }
        },
        bna : {
            color: 'grey',
            [theme.breakpoints.down('321')]: {
                minWidth: '53px'
            },
            [theme.breakpoints.between('321', '380')]: {
                minWidth: '70px'
            }
        }
      
    }))

    const {url} = useRouteMatch()
  
    const classes = useStyles();
    const [value, setValue] = React.useState(url)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
 

    const LinkRef = React.forwardRef((props, ref) => <div><Link {...props} /></div>)
    return (
       <div style={{position: 'fixed', bottom: '0', width: '100%', padding: '10px', zIndex: '16'}}>
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
           <BottomNavigationAction showLabel={true} className={classes.bna} component={LinkRef} to='/buy-item' label={<span className={classes.label}>Buy</span>} value={"/buy-item"} icon={<Fa.FaHandHoldingUsd/>}/>
            <BottomNavigationAction showLabel={true} className={classes.bna} component={LinkRef} to='/sell-item' label={<span className={classes.label}>Sell</span>} value="/sell-item" icon={<Fa.FaDollarSign/>}/>
            <BottomNavigationAction showLabel={true} className={classes.bna} component={LinkRef} to='/' label={<span className={classes.label}>Home</span>}value="/" icon={<AiOutlineHome/>}/>
            <BottomNavigationAction showLabel={true} className={classes.bna} component={LinkRef} to='/repair-device' label={<span className={classes.label}>Repair</span>} value="/repair-device" icon={<Fa.FaTools/>}/>
           <BottomNavigationAction showLabel={true} className={classes.bna} component={LinkRef} to='/account' label={<span className={classes.label}>Profile</span>} value="/account" icon={<Fa.FaUser/>}/>
        </BottomNavigation>
       </div>
    )
}

export default BottomNav
