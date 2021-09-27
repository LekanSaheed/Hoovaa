import React, {useState} from 'react'
import {AppBar, Box} from '@material-ui/core'
import { Input, makeStyles, Link as MuiLink} from '@material-ui/core'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
import {Link, Route, Switch, useHistory, useRouteMatch} from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { GlobalContext } from '../reducers/context'
import SearchResult from './SearchResult'


const SearchPage = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            background: 'white',
            [theme.breakpoints.up('750')]: {
                paddingTop: '50px'
            }
        },
        icons: {
            fontSize: '20px',
            color: 'black',
            padding: '13px 0',
            [theme.breakpoints.up('750')]:{
                fontSize: '30px',
                padding: '20px 0'
            }
        },
        input:{
            padding: '5px',
            fontSize: '13px',
            [theme.breakpoints.up('750')]:{
                fontSize: '20px',
                padding: '17px'
            }
        },
        paper: {
            padding: '10px',
            minHeight: '100vh',
            lineHeight: '34px'
        }
    }))
    const {setSearchResult, state} = GlobalContext()
    const [search, setSearch] = useState('')
    const dummy = state.gadgets
    const classes = useStyle()
    const history = useHistory()
    const barChild = <Box justifyContent='space-between'  padding="0 13px" alignItems='center' display='flex' >
        <span className={classes.icons} onClick={() => history.goBack()}><AiOutlineArrowLeft/></span> 
    <Input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} className={classes.input} placeholder='Search for products' 
    fullWidth={true} type='search'/>
    <span className={classes.icons}>
        <AiOutlineSearch/>
    </span>
    </Box>
   
 const {path, url} = useRouteMatch()
    const searchResult = dummy && dummy.filter(n => {
        return n.name.toLowerCase().includes(search.toLowerCase())
    }).map((n, id) => {
        return(
         <li onClick={() => setSearchResult(n)} key={id}> <MuiLink color="textPrimary" children={<Link to={`${url}/q?=${n.name.replace(/ /g, '-')}`} style={{color: 'black'}}>{n.name}</Link>}/></li>
        )
    })
   
    return (
       <Switch>
           <Route exact path={path}>
           <div style={{position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', zIndex: '3', overflowY: 'scroll', width: '100%'}}>
           <AppBar position='static' className={classes.root}  children={barChild}/>
           <Paper variant='elevation' className={classes.paper} children={<div>{ search && searchResult}</div>}/>
        </div>
           </Route>
           <Route path={`${path}/:result`}>
               <SearchResult/>
           </Route>
       </Switch>
    )
}

export default SearchPage
