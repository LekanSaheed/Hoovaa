import React, {useState} from 'react'
import {Box, Button, Input, makeStyles, Modal, Dialog} from '@material-ui/core'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { db } from '../components/firebase'
import { useHistory } from 'react-router-dom'
const DataCollection = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(null)
    const [evaluatedAt, setEvaluated] = useState(null)
    const [isBadScreen, setIsBadScreen] = useState(false)
    const [isBadBattery, setIsBadBattery] = useState(false)
    const [isBadChargingPort, setIsBadChargingPort] = useState(false)
    const [isBadNetwork, setIsBadNetwork] = useState(false)
    const [isBadSpeaker, setIsBadSpeaker] = useState(false)
    const [isBadJack, setIsBadJack] = useState(false)
    const [isScratchedBody, setIsScratchedBody] = useState(false)
    const [isBadTouchPad, setIsBadTouchPad] = useState(false)
    const [isBadPowerButton, setIsBadPowerButton] = useState(false)
    const [isBadVolumeButtons, setIsBadVolumeButtons] = useState(false) 
    const [isBadFrontCamera, setIsBadFrontCamera] = useState(false) 
    const [isBadBackCamera, setIsBadBackCamera] = useState(false) 
    const [isDeadMotherboard, setIsDeadMotherboard] = useState(false) 
    const [isBadMic, setIsBadMic] = useState(false) 
    const [isBadWifi, setIsBadWifi] = useState(false) 
  const [modal, setModal] = useState(false)
    // const handleSpread = (e) => {
    //     const isExist =  conditions.some(i => i === e.target.value)
    //     if(!isExist){
    //         setConditions([...conditions,e.target.value])
    //     }
       
    //     console.log)
    // }
    const loader = document.querySelector('.loader-container')
    const data = [
        {label: 'Bad Screen',
        func: () => setIsBadScreen(!isBadScreen),
        value: isBadScreen,
    },
    {label: 'Bad Charging Port',
    func:() => setIsBadChargingPort(!isBadChargingPort),
    value: isBadChargingPort,
},
{label: 'Bad Speaker',
func: () => setIsBadSpeaker(!isBadSpeaker),
value: isBadSpeaker,
},
{label: 'Bad Touchpad',
func: () => setIsBadTouchPad(!isBadTouchPad),
value: isBadTouchPad,
},
{label: 'Bad Battery',
func:() => setIsBadBattery(!isBadBattery),
value: isBadBattery,
},
{label: 'Bad Power Button',
func:() => setIsBadPowerButton(!isBadPowerButton),
value: isBadPowerButton,
},
{label: 'Bad mouthpiece',
func: () => setIsBadMic(!isBadMic),
value: isBadMic,
},
{label: 'Bad Volume button',
func:() => setIsBadVolumeButtons(!isBadVolumeButtons),
value: isBadVolumeButtons,
},
{label: 'Bad Network',
func:() =>  setIsBadNetwork(!isBadNetwork),
value: isBadNetwork,
},
{label: 'No wifi',
func: () => setIsBadWifi(!isBadWifi),
value: isBadWifi,
},
{label: 'Bad Front Camera',
func:() =>  setIsBadFrontCamera(!isBadFrontCamera),
value: isBadFrontCamera
},
{label: 'Bad Back Camera',
func: () => setIsBadBackCamera(!isBadBackCamera),
value: isBadBackCamera
},
{label: 'Bad Earpiece Jack',
func: () => setIsBadJack(!isBadJack),
value: isBadJack,
},
{label: 'Dead Motherboard',
func: () => setIsDeadMotherboard(!isDeadMotherboard),
value: isDeadMotherboard,
},
{label: 'Scratched body',
func:() =>  setIsScratchedBody(!isScratchedBody),
value: isScratchedBody
}

    ]
   React.useEffect(() => {
       window.scrollTo(0,0)
   },[])

 
const handleSubmit = () => {
    const loader = document.querySelector('.loader-container')
        loader.classList.remove('loader-hide')
    const colRef = db.collection('survey').doc()
    colRef.set({
        name,
        price,
        isBadMic,
        isBadWifi,
        isDeadMotherboard,
        isBadBackCamera,
        isBadFrontCamera,
        isBadVolumeButtons,
        isBadPowerButton,
        isBadTouchPad,
        isScratchedBody,
        isBadJack,
        isBadSpeaker,
        isBadNetwork,
        isBadChargingPort,
        isBadBattery,
        isBadScreen,
        evaluatedAt,
    }).then(()=> {
        
        setModal(true).then(() => {
            loader.classList.add('loader-hide')
        })
    }).catch(err => {
        console.log(err)
    })
   
      
}
const useStyles = makeStyles({
    root: {
     padding: '10px',
     listStyleType: 'disc'
    },
    label: {
        margin: '18px',
        fontSize: '17px'
    },
    modal: {
        background: '#7497ff',
        color: 'white',
        fontSize: '12px',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '10px'
    }
})
const classes = useStyles()
const history = useHistory()
    return (
        <Box display='flex' flexDirection='column'  className={classes.root}>
          <Modal open={modal} children={<Dialog className='MuiDialog-PaperFullWidth' children={<Box padding='15px'><h4>Thanks for taking the survey, your answers
              have been saved. You can continue the survey or close this modal.</h4>
              <Box display='flex' justifyContent='space-between'>
                  <Button variant="contained" color='primary' onClick={() =>{
                      loader.classList.add('loader-hide')
                      setModal(false)
                       window.location.reload()
                       
                  }}>Continue Survey</Button>
                  <Button variant='outlined' color='secondary' onClick={() => {
                      loader.classList.add('loader-hide')
                      setModal(false)
                      history.goBack()
                  }}>Close Modal</Button></Box></Box>} open={modal}/>}/>
            <Box className={classes.modal}> 
                <p>Please go through the following and answer appropiately. Tick a checkbox to select the condition or conditions you are answering for. Note you can select more than one 
                    checkbox.
                   <ul>
                       <li>Input any device name</li>
                       <li>Input the device's current price</li>
                       <li>Select conditions that apply</li>
                       <li>Set a new worth of the device based on the conditions you selected</li>
                   </ul>
                </p>
            </Box>
           <div>
               <label>Device name</label>
                <Input fullWidth={true} value={name} placeholder='Device name' type='text' onChange={(e) => setName(e.target.value.toLowerCase())}/><br/></div>
                <br/>
              <div>
              <label>Device Price</label>
            <Input value={price}  fullWidth={true}   placeholder='Device Price' type='number' onChange={(e) => setPrice(e.target.value.toLowerCase())}/><br/>
              </div>
         <div>
         {
               data.map((i, id) => {
                return(
                  <div className={classes.label}>
                    <label key={id}>
                    <input type='checkbox' onChange={i.func} value={i.value} name='con' />
                    {i.label} </label>
                    <br/>
                  </div >
                )
            })
           }
         </div>
           <Input type='number' fullWidth={true} value={evaluatedAt} placeholder='Device worth after all selected conditions' onChange={(e) => setEvaluated(e.target.value)}/>
           <br/>
           <Button onClick={handleSubmit} 
           variant='contained' color='primary' endIcon={<AiOutlineCloudUpload/>}
           size='large'
            children={<span>Submit</span>}/>
            
        </Box>
    )
}

export default DataCollection
