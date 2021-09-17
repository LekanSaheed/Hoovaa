import React from 'react'
import AdminUpload from './AdminUpload'
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'
import {db} from '../components/firebase'
import {Box, makeStyles} from '@material-ui/core'
import './Admin.css'
import Repairs from './Repairs'

const Admin = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            [theme.breakpoints.up(801)]:{
                flexDirection: 'row'
        }
        },
        nav:{
            background: 'rgb(19, 26, 41)',
            color: 'white',
            fontWeight: '600',
            fontSize: '15px',
            minWidth: '250px',
            wordWrap: 'none',
            lineHeight: '35px'
        
        },
        navLinks: {
            background: 'rgb(29, 40, 63)',
            padding: '2px 12px',
            margin: '10px',
            cursor: 'pointer',
            color: 'white',
            borderRadius: '10px'
        },
        navGroup: {
            background: 'rgb(29, 40, 63)',
            paddingTop: '20px'
        }
    }))
    React.useEffect(() => {
        window.scrollTo(0,0)
    },[])
    const classes = useStyle()
    const { url, path} = useRouteMatch()
    return (
        <Box className={classes.root}>
            <ul className={`${classes.nav} admin-nav`}>
           <div className={classes.navGroup}>
           <Link to={`${url}/upload-used-phones` }> <li className={classes.navLinks}>Upload used Gadgets</li> </Link>
            <Link to={`${url}/upload-products` }> <li className={classes.navLinks}>Upload Products</li></Link>
            <Link to={`${url}/sell-orders` }> <li className={classes.navLinks}>Sell Requests</li></Link>
            <Link to={`${url}/buying-orders` }> <li className={classes.navLinks}>Buy Requests</li></Link>
            <Link to={`${url}/swap-requests` }> <li className={classes.navLinks}>Swap Requests</li></Link>
            <Link to={`${url}/repair-orders` }> <li className={classes.navLinks}>Repair Orders</li></Link>
           </div>
            </ul>
            <Switch>
                <Route path={`${path}/upload-used-phones` }>
                <AdminUpload tag='Upload used phones' colRef={db.collection('usedPhones')}/>
                </Route>
                <Route path={`${path}/upload-products` }>
                <AdminUpload tag='Upload gadgets' colRef={db.collection('phones')}/>
                </Route>
                <Route path={`${path}/repair-orders` } component={Repairs}/>
            </Switch>
           
        </Box>
    )
}

export default Admin
