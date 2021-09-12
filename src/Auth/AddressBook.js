import React, {useState} from 'react'
import {Box, Fab, makeStyles, AppBar, FormControl, TextField, Button, Select} from '@material-ui/core'
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai'
import { Link, useRouteMatch, Switch, Route, useHistory } from 'react-router-dom'
import { State, City} from 'country-state-city'
import { db, firebase } from '../components/firebase'
import { GlobalContext } from '../reducers/context'
import {Skeleton} from '@material-ui/lab'

const AddressBook = () => {
    const {url, path} = useRouteMatch()
    const useStyle = makeStyles(theme => ({
        root: {
            minHeight: '90vh',
            padding: '10px'
        },
        addBtn: {
            background: '#7497ff',
            color: 'white',
            fontSize: '22px'
        },
    }))
    const classes = useStyle()
    const [address, setAddress] = useState('') 
const {state} = GlobalContext()
   React.useEffect(() => {
    const userAddress = db.collection('users').doc(state.currentUser.uid)
    userAddress.get().then(doc => {
        setAddress(doc.data().address)
        
    }).catch(err => {
        setAddress(err.message)
    })
   }, [state.currentUser.uid])
    return (
        <Switch>
            <Route exact path={path}>
           <Box className={classes.root}>
           Add address<br/>
        {address ? address : <><Skeleton width={100} /><br/><Skeleton variant="rect"/></>}
<Link id='addBtn' to={url + '/add-address'} className='cart-btn-btn'>
    <Fab className={classes.addBtn} children={<AiOutlinePlus/>}/>
</Link>
           </Box>
            </Route>
            <Route path={path + '/add-address'} component={AddAddress}/>
        </Switch>

    )
}
const AddAddress = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            minHeight: '75vh'
        },
        bar:{
            background: 'white',
            padding: '5px 0',
            color: 'black',
            fontSize: '20px',
            [theme.breakpoints.up(812)]: {
                padding: '30px 0'
            }
        }
    }))
    const classes = useStyle()
    const history = useHistory()
    const barChildren = <Box padding='10px'><AiOutlineArrowLeft 
    onClick={() => history.goBack()}/> <span>Add New Address</span> </Box>

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [stateCode, setStateCode] = useState('')
    const [userState, setUserState] = useState('')
    const [userCity, setUserCity] = useState('')
  //  console.log(City.getCitiesOfState('NG', 'LA'))
    const states = State.getStatesOfCountry('NG')
    const city = City.getCitiesOfState('NG', stateCode)
    const addAddress = () => {
        firebase.auth().onAuthStateChanged(user => {
            const currentUser = user
            const docRef = db.collection('users').doc(currentUser.uid)

           return docRef.update({
                address: `${address1 + ', ' + address2 + ', ' + userCity  + ', ' + userState}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log('Updated')
            }).catch(err => {
                console.log(err)
            })
        })
     
    }
    return(
        <Box className={classes.root}>
            <AppBar className={classes.bar} children={barChildren}/>
            <Box padding='10px' marginTop='15px'>
              
              <FormControl fullWidth={true}>

              <TextField type='text' value={address1} onChange={(e) => setAddress1(e.target.value)} 
               fullWidth={true} label={<label>Address Line 1</label>} margin='dense' required/>

              </FormControl>
                            
                <FormControl fullWidth={true}>
                <TextField type='text' value={address2} onChange={(e) => setAddress2(e.target.value)} 
                fullWidth={true} label={<label>Address Line 2 (Optional)</label>}/>
                </FormControl>
                <FormControl fullWidth={true}>
          <Select native={true} label='State' onChange={(e) => {
                        const ned =   JSON.parse(e.target.value)
                        console.log(ned)
                          setUserState(ned.name)
                        setStateCode(ned.isoCode)
                    }}>
              <option>
                  Please Select a state
              </option>
              {states.map((state, idx) => {
                  return(
                    <option value={JSON.stringify(state)} key={idx}>
                    {state.name}
                </option>
                  )
              })}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>

         <Select native={true} label='City' disabled={!stateCode} onChange={(e) => {
             setUserCity(e.target.value)
         }}>
         <option>
                 City
              </option>
              {city.map((city, idx) => {
                  return(
                      <option key={idx} value={city.name}>
                          {city.name}
                      </option>
                  )
              })}
         </Select>
        </FormControl>
        <br/>
        <FormControl fullWidth={true}>
            <br/>
        <Button onClick={addAddress} children='Add' disabled={!address1 || !address2 || !stateCode}
         variant='contained' size='medium' color='primary'/>
        </FormControl>

        
            </Box>
        </Box>
    )
}
export default AddressBook
