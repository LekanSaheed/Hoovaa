import React, {useState} from 'react'
import {TextField, Button, makeStyles, Box, RadioGroup, Radio} from '@material-ui/core'


const RepairGadgets = () => {
    const handleSubmit = () => {

    }
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
    const [damages, setDamages] = useState('')
    const radio = document.querySelectorAll('input[type=radio]:checked')
    return (
        <form>
            <Box padding='10px' display='flex' flexDirection='column'>
            <TextField fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} required label="Gadget Name" />
            <TextField fullWidth={true} value={model} onChange={(e) => setModel(e.target.value)} required label="Gadget Model" />
            <TextField fullWidth={true} value={brand} onChange={(e) => setBrand(e.target.value)} required label="Gadget Brand Name" />
           
            <TextField fullWidth={true} variant='standard' value={damages} onChange={(e) => setDamages(e.target.value)} required label='Damage(s)' multiline={true} minRows={4} /><br/>
          
           {/* <div className={classes.repairType}>
               <h4>Choose Service type</h4>
           <label>
            <input type='radio' name='repairType' value='doorPost'/>
             Door Post Repair (Extra Charges apply)
            </label>
            <br/>
           <label>
           <input type='radio' name='repairType' value='outLet'/>
             Outlet Repair 
           </label>
           </div> */}
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
           <Button disabled={!name || !brand || !model || !damages || !radio} onClick={handleSubmit} children='submit' variant='contained' color='primary'/>
            </Box>
        </form>
    )
}

export default RepairGadgets
