import React, {useState} from 'react'
import { db } from '../components/firebase'
import { GlobalContext } from '../reducers/context'
import {Box, Button, makeStyles} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const Repairs = () => {
    const [repair, setRepair] = useState([])
    const [loaded, setLoad] = useState(false)
const {state} = GlobalContext()
    React.useEffect(() => {
        const userRef = db.collection('users').doc(state.currentUser.uid).collection('repairHistory')
        userRef.get().then(snapshot => {
            const arr = []
            
            snapshot.forEach(doc => {
                arr.push(doc.data())
                console.log(doc.data())
            })
            setRepair(arr)
            setLoad(true)
           
        })
    },[state.currentUser.uid])

    const useStyle = makeStyles(theme => ({
        root: {
            minHeight: '300px'
        },
        gadget: {
            fontSize: '13px',
            boxShadow: '0px 0px 10px 0px rgba(0 0 0 /14%)',
            padding: '10px',
            lineHeight: '40px'
        },
        damages: {
            gap: '10px'
        }
    }))
    const classes = useStyle()
    return (
        <Box className={classes.root} padding='10px' display='flex' flexDirection='column'>
            My Repair History
           {loaded ? null :  <>
            <Skeleton variant='text' width='40%'/>
            <Skeleton variant='text' width='60%'/>
            <Skeleton variant='rect'/>
            <Skeleton variant='rect' height={50}/>
            <Skeleton variant='text'/>
            <Skeleton variant='text'/>
            </>}
            {repair ? repair.map(item => {
               return(
                <Box onLoad={() => setLoad(true)} className={classes.gadget} display='flex' flexDirection='column' key={item.name + item.brand + item.model}> 
                <div>Device Name: {item.name + ' ' + item.model}</div>
                <div>Device Brand: {item.brand}</div>
                <div>Repair Status: {item.isRepaired ? 'Repaired' : 'Not Repaired'}
                
                </div>
                <Box display='flex' className={classes.damages}>
                    Damages:  
                    {item.damages && item.damages.map(damages => {
                        return(
                            <div>
                                {damages.value}
                                </div>
                        )
                    })}
                </Box>
                <Button size='small' variant='contained' color='secondary'>Remove</Button>
                </Box>
               )
            }) : 'Repair History Will appear here' }
        </Box>
    )
}

export default Repairs
