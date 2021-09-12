import React, {useState} from 'react'
import {TextField, Button, makeStyles, Box, RadioGroup, Radio, Modal, Dialog, DialogContent} from '@material-ui/core'
import Select from 'react-select'
import {options} from './options'
import { db } from '../../firebase'
import { GlobalContext } from '../../../reducers/context'
import { useHistory } from 'react-router-dom'
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
    const radio = document.querySelectorAll('input[type=radio]:checked')
    const history = useHistory()
    const handleDamage = (selectedDamage) => {
            setSelectedDamage(selectedDamage)
            console.log('iselected', selectedDamage)
    }
    const handleSubmit = () => {
        if(!state.isUser){
            history.push('/login')
        }
        if(state.isUser){
            const systemDoc = db.collection('repairs').doc()
          const docRef = db.collection('users').doc(state.currentUser.uid)
          systemDoc.set({
            isRepaired: false, name, brand, model, damages: selectedDamage, customerId: state.currentUser.uid 
          }).then(() =>{
            docRef.update({repairHistory: [{isRepaired: false, name, brand, model, damages: selectedDamage}]})
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
         
        }
    }
    return (
        <form>
            <Modal open={error || success} children={<Dialog open={success || error} children={<DialogContent>{error && error}
             {success && success}<br/>
             <Button variant='contained' color={`${error ? 'secondary': 'primary'}`} onClick={() => {
                 setError('')
                 setSuccess('')
             } }>Close</Button> </DialogContent>}/>} />
            <Box padding='10px' display='flex' flexDirection='column'>
            <TextField fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} required label="Gadget Name" />
            <TextField fullWidth={true} value={model} onChange={(e) => setModel(e.target.value)} required label="Gadget Model" />
            <TextField fullWidth={true} value={brand} onChange={(e) => setBrand(e.target.value)} required label="Gadget Brand Name" />
           
            <Select isMulti={true}
            isSearchable={true}
        value={selectedDamage}
        onChange={handleDamage}
        options={options}
        placeholder='Select Damage(s)'
        theme={theme => ({
            ...theme,
            borderRadius: '50',
            fontSize: '11',
            padding: '10',
            colors: {
                ...theme.colors,
                primary25: '#7497ff',
                
            }

        })}
      />
          
         
           <div>
               <h3>Service Type</h3>
         
           <RadioGroup className={classes.radioContainer}>
              <label className={classes.radio}>
                   <Radio  color='primary' value='door post' label='Door Post Repair' about='Door'/> Door Post Repair
              (Extra Charges Apply)</label> 
              <label className={classes.radio}>
                   <Radio  value='outlet' color='primary' label='Outlet Repair'/> Outlet Repair</label>
           </RadioGroup>
           </div>
           <br/>
           <Button disabled={!name || !brand || !model  || !radio} onClick={handleSubmit} 
           children='Request Service' variant='contained' color='primary'/>
            </Box>
        </form>
    )
}

export default RepairGadgets
