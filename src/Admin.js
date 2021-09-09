import React from 'react'
import AdminUpload from './AdminUpload'
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'
import {db} from './components/firebase'
import {Box, makeStyles} from '@material-ui/core'
import './Admin.css'

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
            background: 'black',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px'
        }
    }))
    React.useEffect(() => {
        window.scrollTo(0,0)
    },[])
    const classes = useStyle()
    const { url} = useRouteMatch()
    return (
        <Box className={classes.root}>
            <ul className={`${classes.nav} admin-nav`}>
                <li><Link to={`${url}/upload-used-phones` }>Upload used phones details</Link></li>
                <li><Link to={`${url}/upload-products` }>Upload Products</Link></li>
            </ul>
            <Switch>
                <Route path={`${url}/upload-used-phones` }>
                <AdminUpload tag='Upload used phones' colRef={db.collection('usedPhones')}/>
                </Route>
                <Route path={`${url}/upload-products` }>
                <AdminUpload tag='Upload gadgets' colRef={db.collection('usedPhones')}/>
                </Route>
            </Switch>
           
        </Box>
    )
}

export default Admin
