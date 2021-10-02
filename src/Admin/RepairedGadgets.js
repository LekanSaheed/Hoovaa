import React, {useState} from 'react'
import {Button, Box, Dialog, DialogContent, Modal, makeStyles} from '@material-ui/core'
import {AiOutlineCheck, AiOutlineCloseCircle} from 'react-icons/ai'
import { GlobalContext } from '../reducers/context'
import { db, firebase } from '../components/firebase'


const RepairedGadgets = ({repairData}) => {
    const [modal, setModal] = useState(false)
    const {setModalStat} = GlobalContext()
      const useStyle = makeStyles(theme => ({
           gadgets: {
            boxShadow: '0 0 10px 0 rgba(0 0 0 /14%)',
            padding: '15px',
            margin: '15px'
        },
        status: {
            color: 'green',
            fontWeight: '600'
        },
        statusBad: {
            color: '#c41e3a',
            fontWeight: '600'
        },
         }))


  const classes = useStyle()


 const updateRepairDoc = (item) => {
        const loader = document.querySelector('.loader-container')
        loader.classList.remove('loader-hide')
        const docRef = db.collection('repairs')
        .doc(item.id)
        const custRef = db.collection('users')
        .doc(item.customerId).collection('repairHistory').doc(item.repairId)  
       console.log(item)
        custRef.update({
            isRepaired: false,
        })  
        .then(()=> {
            docRef.update({
                isRepaired: false,
            })  
           
        })
        .then(()=>{
            setModal(false)
            loader.classList.add('loader-hide')
        }) 
        .then(()=> {
            setModalStat('Updated Successfully')
        })
        // .then(()=> {
        //     window.location.reload()
        // })
        .catch((err)=> {
            console.log(err)
            setModalStat('Something Went wrong')
            loader.classList.add('loader-hide')
        })
        return;
    }
    const updateCustomerCollectedStatus = (item) => {
        const loader = document.querySelector('.loader-container')
        loader.classList.remove('loader-hide')
        const docRef = db.collection('repairs').doc(item.id)
        const custRef = db.collection('users').doc(item.customerId).collection('repairHistory').doc(item.repairId)  
       console.log(item)
        custRef.update({
           personnelReturned: true,
            modified: firebase.firestore.Timestamp.now()
        })  
        .then(()=> {
            docRef.update({personnelReturned: true,
             modified: firebase.firestore.Timestamp.now()
            })
           
        })
        .then(()=>{
            setModal(false)
            loader.classList.add('loader-hide')
        }) 
        .then(()=> {
            setModalStat('Updated Successfully')
        })
        .catch((err)=> {
            console.log(err)
            setModalStat('Something Went wrong')
            loader.classList.add('loader-hide')
        })
    }
    return (
        <Box>
       {React.Children.toArray(
           repairData.filter(i => i.isRepaired === true).map(repair => {
               return(
                   <Box className={classes.gadgets} display='flex' flexDirection='column'>
                     
                   <div>Gadget Name: {repair.name}</div>
                   <div>Gadget Brand: {repair.brand}</div>
                   <div>Gadget Model: {repair.model}</div>
                   <div>Gadget Damages{React.Children.toArray(
                      repair.damages && repair.damages.map(damages => {
                           return(
                               <div>
                                   {damages.value}
                               </div>
                           )
                       })
                   )}</div>
                   <div>Repair Status: {repair.isRepaired ?
                    <Box className={classes.status} display='flex'  alignItems='center'>
                        <span>Repaired</span><AiOutlineCheck/></Box> :
                        <Box className={classes.statusBad} alignItems='center'display='flex'>
                       <AiOutlineCloseCircle/>
                       <span>Not Repaired</span>
                       </Box>}</div>

                   <Box>
                      <Box>
                      {(repair.personnelReceived && repair.personnelReturned) && 'Returned'}
                      {(repair.personnelReceived && !repair.personnelReturned) && 'Not Returned'}
                       </Box>
                       {/* <Button onClick={() => updateRepairDoc(repair)}>
                           Change Status
                       </Button><br/> */}

                       {repair.isRepaired && !repair.personnelReturned ? 
                       <Button variant='contained' color='primary' 
                       onClick={() => updateCustomerCollectedStatus(repair)}>
                               Set Return Status
                           </Button> : ''}
                   </Box>
                   {modal && <Modal open={modal} children={<Dialog open={modal} children={<DialogContent>
           Clicking Update Status Means the gadget is repaired and is due for collection<br/>
                      <Box>
                   <Button onClick={() => updateRepairDoc(repair)}>Update Status</Button> 
              <Button onClick={() => setModal(false)}>Cancel</Button></Box>
       </DialogContent>}/>}/>}
               </Box>
               )
           })
       )}
           </Box>
    )
}

export default RepairedGadgets
