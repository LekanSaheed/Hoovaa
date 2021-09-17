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
  
        userRef.onSnapshot(snapshot => {
            const arr = []
            
            snapshot.forEach(doc => {
                const {collected, name, damages, brand, isRepaired, model} = doc.data()
                arr.push({
                    collected,
                    name,
                    damages,
                    brand,
                    isRepaired,
                    model,
                    docId: doc.id
                })
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
           border: 'solid 2px #7497ff19',
           borderRadius: '15px',
            padding: '15px',
            lineHeight: '40px',
            margin: '10px',
            color: '#161B5B',
            textTransform: 'capitalize',
            
        },
        damages: {
            gap: '10px'
        },
        status: {
            fontWeight: '700',
            fontSize: '16px',
            color: '#5E5DEE'
        },
        name: {
            fontSize: '14px',
            fontWeight: '800'
        },
        date: {
            color: '#AAB2BA',
            fontWeight: '500',
            fontSize: '11px'
        }
    }))
    const classes = useStyle()
    const cancelOrder = (item) => {
        const docRef = db.collection('users').doc(state.currentUser.uid).collection('repairHistory').doc(item.docId)

      const rdRefs = db.collection('repairs').where('repairId', '==', item.docId)
     console.log(rdRefs)
     rdRefs.get().then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          doc.ref.delete();
          console.log('deleted')
        });
      }).catch(err=> {
          console.log(err)
      });
     
        docRef.delete().then(() => {
            console.log('deleted')
        }).catch(err=> {
            console.log(err,'error')
        })
    }
    return (
        <Box className={classes.root} padding='10px' display='flex' flexDirection='column'>
            My Repair History
            {loaded && 'loaded'}
           { repair.length === 0 &&   <>
            <Skeleton variant='text' width='40%'/>
            <Skeleton variant='text' width='60%'/>
            <Skeleton variant='rect'/>
            <Skeleton variant='rect' height={50}/>
            <Skeleton variant='text'/>
            <Skeleton variant='text'/>
            </>}
            {repair ? repair.map(item => {
               return(
                <Box onLoad={() => setLoad(true)} className={classes.gadget} display='flex'
                 flexDirection='column' key={item.id}> 
                  <div className={classes.status}>STATUS: {item.isRepaired ? 'Repaired' : 'Not Repaired'}
                </div>
                <div className={classes.date}>Date </div>
               <Box display='flex' className={classes.name} justifyContent='space-between'> <div> {item.name}</div>
                <div> {item.brand}</div>
                </Box>
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
                <Button size='large' variant='outlined'  color='primary' onClick={() => cancelOrder(item)}>CANCEL</Button>
                </Box>
               )
            }) : 'Repair History Will appear here' }
        </Box>
    )
}

export default Repairs
