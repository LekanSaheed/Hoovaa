import React, {useState} from 'react'
import {TextField, Button, makeStyles, Box,  Modal, Dialog, DialogContent} from '@material-ui/core'
import Select from 'react-select'
import {options} from './options'
import { db } from '../../firebase'
import { GlobalContext } from '../../../reducers/context'
import { useHistory } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {BsGear} from 'react-icons/bs'



const RepairGadgets = () => {
  
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const useStyle = makeStyles(theme => ({
        root: {

        },
        repairType: {
            lineHeight: '40px'
        },
        radio:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        radioContainer:{
           alignItems: 'start'
        }
    }))
    const classes = useStyle()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const {state} = GlobalContext()
    const [selectedDamage, setSelectedDamage] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


   

    const history = useHistory()
    const handleDamage = (selectedDamage) => {
            setSelectedDamage(selectedDamage)
    }
    const handleSubmit = () => {
        if(!state.isUser){
            history.push('/login')
        }
        const newId = new Date().getTime().toString()
        if(state.isUser){
            const systemDoc = db.collection('repairs').doc()
          const docRef = db.collection('users').doc(state.currentUser.uid).collection('repairHistory').doc(newId)
          systemDoc.set({
            isRepaired: false, name, brand, model, damages: selectedDamage,
             customerId: state.currentUser.uid, repairId: newId,
            personnelReceived: false, personnelReturned: false,
            created: firebase.firestore.Timestamp.now()
          }).then(() =>{
            docRef.set({isRepaired: false, name, brand, model, damages: selectedDamage,
                personnelReceived: false, personnelReturned: false,
                created: firebase.firestore.Timestamp.now()})
            .then(() => {
                setSuccess('Your Request Has been Received And You Shall be Contacted Shortly')
                setError('')
            })
            .catch(err => {
              setError(err.message)
              setSuccess('')
            })
          }).catch(err => {
              setError(err.message)
              setSuccess('')
          })
         console.log(radio)
        }
    }
    const radio = document.querySelectorAll('input[type=radio]:checked')
    return (
        <form className={classes.root}>
            <Helmet>
                <meta name='description' content='hoovaa, repair, repair gadgets, repair now, hoovaa, sell buy repair'/>
            </Helmet>
            <Modal open={error || success} children={<Dialog open={success || error} children={<DialogContent>{error && error}
             {success && success}<br/><br/>
             <Button variant='contained' color={`${error ? 'secondary': 'primary'}`} onClick={() => {
                 setError('')
                 setSuccess('')
             } }>Close</Button> </DialogContent>}/>} />
            <Box padding='10px' gridGap='10px' display='flex' flexDirection='column'>
            <TextField fullWidth={true} variant='outlined' value={name} onChange={(e) => setName(e.target.value)} required label="Gadget Name" />
            <TextField fullWidth={true} variant='outlined' value={model} onChange={(e) => setModel(e.target.value)} required label="Gadget Model" />
            <TextField fullWidth={true} variant='outlined' value={brand} onChange={(e) => setBrand(e.target.value)} required label="Gadget Brand Name" />
           
            <Select isMulti={true}
            isSearchable={true}
        value={selectedDamage}
        onChange={handleDamage}
        options={options}
        placeholder='Select Damage(s)'
        theme={theme => ({
            ...theme,
            borderRadius: '50',
            fontSize: '10px',
            padding: '20px',
            colors: {
                ...theme.colors,
                primary25: '#7497ff',
                primary: 'white'
                
            }

        })}
      />
    
         
           {/* <div>
               <h3>Service Type</h3>
         
           {/* <RadioGroup className={classes.radioContainer}>
              <label className={classes.radio}>
                   <Radio  color='primary' value='door post'/> Door Post Repair
              (Extra Charges Apply)</label> 
              <label className={classes.radio}>
                   <Radio  value='outlet' color='primary'/> Outlet Repair</label>
           </RadioGroup> */}
           {/* <Box display='flex' padding='10px' gridGap='10px' flexDirection='column'>
              <label> <input name='service type' type='radio'/> Door Post Repair</label>
              <label> <input name='service type' type='radio'/> Outlet Repair</label>
           </Box> */}
           
           <br/>
           <Button disabled={!name || !brand || !model  || !selectedDamage ||
            selectedDamage === null || selectedDamage.length < 1} size='large' endIcon={<BsGear/>} onClick={handleSubmit} 
           children='Request Service' variant='contained' color='primary'/>
            </Box>
        </form>
    )
}

export default RepairGadgets
