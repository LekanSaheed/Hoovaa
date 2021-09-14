import { Box, Button, makeStyles, Modal, DialogContent, Dialog } from '@material-ui/core'
import React, {useState} from 'react'
import { db } from '../components/firebase'
import { GlobalContext } from '../reducers/context'

const Repairs = () => {
 const [repairs, setRepairs] = useState([])
 const [modal, setModal] = useState(false)
 const [error, setError] = useState('')
    React.useEffect(() => {
        const repairData = []
        window.scrollTo(0,0)
        const docRef = db.collection('repairs')
        docRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const {name, brand, model, damages, isRepaired} = doc.data()
                repairData.push({
                    name, brand, model, damages, isRepaired,
                    id: doc.id
                })
                console.log(repairData)
            })
           
        }).then(()=> {
            setRepairs(repairData)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])

    const useStyle = makeStyles(theme => ({
        root: {

        },
        gadgets: {
            boxShadow: '0 0 10px 0 rgba(0 0 0 /14%)',
            padding: '15px',
            width: '100%',
            margin: '15px'
        }
    }))
    const classes = useStyle()
    const {setModalStat} = GlobalContext()
    const updateRepairDoc = (id) => {
        const docRef = db.collection('repairs').doc(id)
        docRef.update({isRepaired: true}).then(()=> {
            setModal(false)
        }).then(()=> {
            setModalStat('Updated Successfully')
        })
        .catch((err)=> {
            setError(err.message)
            setModalStat('Something Went wrong')
        })
    }
    return (
        <Box>
           
            New Repair Orders will appear here
            {error && error}
            <Box>
        {React.Children.toArray(
            repairs.filter(i => i.isRepaired === false).map(repair => {
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
                            repair.damages.map(damages=> {
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
