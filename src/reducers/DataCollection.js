import React, {useState} from 'react'
import {Box, Button, Input, makeStyles} from '@material-ui/core'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { db } from '../components/firebase'
const DataCollection = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(null)
    const [evaluatedAt, setEvaluated] = useState(null)

    // const handleSpread = (e) => {
    //     const isExist =  conditions.some(i => i === e.target.value)
    //     if(!isExist){
    //         setConditions([...conditions,e.target.value])
    //     }
       
    //     console.log)
    // }
    const data = [
        {label: 'Bad Screen',
        type: 'text',
        value: 'bad screen',
    },
    {label: 'Bad Charging Port',
    type: 'text',
    value: 'bad charging port',
},
{label: 'Bad Speaker',
type: 'text',
value: 'bad speaker',
},
{label: 'Bad Touchpad',
type: 'text',
value: 'bad touchpad',
},
{label: 'Bad Battery',
type: 'text',
value: 'bad battery',
},
{label: 'Bad Power Button',
type: 'text',
value: 'bad power button',
},
{label: 'Bad mouthpiece',
type: 'text',
value: 'bad mouthpiece',
},
{label: 'Bad Volume button',
type: 'text',
value: 'bad volume button',
},
{label: 'Bad Network',
type: 'text',
value: 'bad network',
},
{label: 'No wifi',
type: 'text',
value: 'No wifi',
},
{label: 'No Factory box or carton',
type: 'text',
value: 'no factory box',
},
{label: 'Bad Earpiece Jack',
type: 'text',
value: 'bad earpiece jack',
},
{label: 'Cracked Screen',
type: 'text',
value: 'cracked screen',
},
{label: 'Scratched body',
type: 'text',
value: 'Scratched body'
}

    ]
    let arr = []
   React.useEffect(() => {
       window.scrollTo(0,0)
   },[])

 
const handleSubmit = () => {
    const checkboxes = document.querySelectorAll(`input[name=con]:checked`)
    checkboxes.forEach(checkbox => {
        const isExist = arr.some(e => e === checkbox.value)

          if(!isExist){
            arr.push(checkbox.value)
            console.log(arr)
          }
         
    
    })
    const colRef = db.collection('survey').doc()
    console.log( name,
        price,
        evaluatedAt)
    colRef.set({
        name,
        price,
        conditions: arr,
        evaluatedAt
    }).then(()=> {
        window.location.reload()
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
    return (
        <Box display='flex' flexDirection='column'  className={classes.root}>
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
                    <input type='checkbox' value={i.value} name='con' />
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
