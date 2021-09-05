import React from 'react'
import AdminUpload from './AdminUpload'
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'
import {db} from './components/firebase'
import {Box, makeStyles} from '@material-ui/core'


const Admin = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            [theme.breakpoints.up(801)]:{
                flexDirection: 'row'
        }
        }
    }))
    const classes = useStyle()
    const { url} = useRouteMatch()
    return (
        <Box className={classes.root}>
            <ul>
                <li><Link to={`${url}/upload-used-phones` }>Upload used phones details</Link></li>
                <li><Link to={`${url}/upload-products` }>Upload Products</Link></li>
            </ul>
            <Switch>
                <Route path={`${url}/upload-used-phones` }>
                <AdminUpload colRef={db.collection('usedPhones')}/>
                </Route>
                <Route path={`${url}/upload-products` }>
                <AdminUpload  colRef={db.collection('usedPhones')}/>
                </Route>
            </Switch>
           
        </Box>
    )
}

export default Admin
