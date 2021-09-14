import { Box, Button, makeStyles, Modal, DialogContent, Dialog } from '@material-ui/core'
import React, {useState} from 'react'
import { db } from '../components/firebase'
import { GlobalContext } from '../reducers/context'
import {AiOutlineCheck, AiOutlineCloseCircle} from 'react-icons/ai'
const Repairs = () => {
 const [repairs, setRepairs] = useState([])
 const [modal, setModal] = useState(false)
 const [error, setError] = useState('')
    React.useEffect(() => {
        const repairData = []
        window.scrollTo(0,0)
        const docRef = db.collection('repairs')
        docRef.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const {name, brand, model, damages, isRepaired, repairId, customerId} = doc.data()
                repairData.push({
                    name, brand, model, damages, isRepaired, repairId,
                    customerId,
                    id: doc.id
                })
                console.log(repairData)
                setRepairs(repairData)
            })
           
        })
    },[])

    const useStyle = makeStyles(theme => ({
        root: {
            width: '100%'
        },
        gadgets: {
            boxShadow: '0 0 10px 0 rgba(0 0 0 /14%)',
            padding: '15px',
            margin: '15px'
        },
        tag: {
            background: 'rgb(19, 26, 41)',
            color: 'white'
        }
    }))
    const classes = useStyle()
    const {setModalStat} = GlobalContext()
 
    const updateRepairDoc = (id, customerId, repairId) => {

        const docRef = db.collection('repairs').doc(id)
        const custRef = db.collection('users').doc(customerId).collection('repairHistory').doc(repairId)  
        custRef.update({
            isRepaired: true
        }).then(()=>{
            setModal(false)
        })   
        .then(()=> {
            docRef.update({isRepaired: true})  
           
        })
        .then(()=> {
            setModalStat('Updated Successfully')
        })
        .catch((err)=> {
            setError(err.message)
            setModalStat('Something Went wrong')
        })
    }
    return (
        <Box className={classes.root}>
           
            New Repair Orders will appear here
            {error && error}
            <Box>
        {React.Children.toArray(
            repairs.filter(i => i.isRepaired === false).map(repair => {
                return(
                    <Box className={classes.gadgets} display='flex' flexDirection='column'>
                         {modal && <Modal open={modal} children={<Dialog open={modal} children={<DialogContent>
                Clicking Update Status Means the gadget is repaired and is due for collection<br/>
                   <Box> <Button onClick={() => updateRepairDoc(repair.id, repair.customerId, repair.repairId)}>Update Status</Button> 
                   <Button onClick={() => setModal(false)}>Cancel</Button></Box>
            </DialogContent>}/>}/>}
                        <div>Gadget Name: {repair.name}</div>
                        <div>Gadget Brand: {repair.brand}</div>
                        <div>Gadget Model: {repair.model}</div>
                        <div>Gadget Damages{React.Children.toArray(
                           repair.damages && repair.damages.map(damages=> {
                                return(
                                    <div>
                                        {damages.value}
                                    </div>
                                )
                            })
                        )}</div>
                        <div>Repair Status: {repair.isRepaired ? <Box><span>Repaired</span><AiOutlineCheck/></Box> :<Box>
                            <AiOutlineCloseCircle/>
                            <span>Not Repaired</span>
                            </Box>}</div>

                        <Box>
                            <Button onClick={() => setModal(true)}>
                                Change Status
                            </Button>
                        </Box>
                    </Box>
                )
            })
        )}
            </Box>

            <div className={classes.tag}>Repaired</div>
            <Box>
        {React.Children.toArray(
            repairs.filter(i => i.isRepaired === true).map(repair => {
                return(
                    <Box className={classes.gadgets} display='flex' flexDirection='column'>
                         {modal && <Modal open={modal} children={<Dialog open={modal} children={<DialogContent>
                Clicking Update Status Means the gadget is repaired and is due for collection<br/>
                   <Box> <Button onClick={() => updateRepairDoc(repair.id)}>Update Status</Button> 
                   <Button onClick={() => setModal(false)}>Cancel</Button></Box>
            </DialogContent>}/>}/>}
                        <div>Gadget Name: {repair.name}</div>
                        <div>Gadget Brand: {repair.brand}</div>
                        <div>Gadget Model: {repair.model}</div>
                        <div>Gadget Damages{React.Children.toArray(
                         repair.damages &&    repair.damages.map(damages=> {
                                return(
                                    <div>
                                        {damages.value}
                                    </div>
                                )
                            })
                        )}</div>
                        <div>Repair Status: {repair.isRepaired ? 'Repaired' : 'Not Repaired'}</div>

                        <Box>
                            <Button onClick={() => setModal(true)}>
                                Change Status
                            </Button>
                        </Box>
                    </Box>
                )
            })
        )}
            </Box>
        </Box>
    )
}

export default Repairs
