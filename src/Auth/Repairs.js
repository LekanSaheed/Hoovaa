import React, {useState} from 'react'
import { db } from '../components/firebase'
import { GlobalContext } from '../reducers/context'
import {Box, makeStyles} from '@material-ui/core'

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
           border: 'solid 3px #f9f9f9',
           borderRadius: '15px',
            padding: '15px',
            margin: '10px',
            color: '#161B5B',
            textTransform: 'capitalize',
            gap: '20px',
            background: '#fafafa'
        },
        damagesCont: {
            gap: '10px',
            alignItems: 'center',
            overflowY: 'scroll'
        },
        dmgItem: {
            padding: '5px 10px',
            background: '#efefef',
            borderRadius: '18px',
            whiteSpace: 'nowrap',
            fontWeight: '600',
            
        },
        status: {
            fontWeight: '700',
            fontSize: '16px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            height: '120px',
            borderRadius: '15px',
            background: '#16171c',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'inset(0px)'
        },
        stat:{
            position: 'absolute',
            zIndex: '2'
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
           <div className='centered-text'>
               Your repair orders will appear here when you make a repair order</div>
            </>}
            {repair ? repair.map(item => {
               return(
                <Box onLoad={() => setLoad(true)} className={classes.gadget} display='flex'
                 flexDirection='column' key={item.id} > 
                  <div className={classes.status}>
                      <Box display='flex' alignItems='center' gridGap='20px'
                       justifyContent='space-between' flexDirection='column'
                   className={classes.stat}>
                     <div style={{fontSize: '11px', fontWeight: '400', marginTop: '-20px'}}> Status</div> 
                     <div>{item.isRepaired ? 'Repaired' : 'Not Repaired'}</div>
                     </Box>
                  <div className='circContainer'>
                  <div className='circle'></div><div className='circle2'></div>
                  </div>
                </div>
               
                <div className={classes.date}>Date: {repair.created.toDate().toDateString()} </div>
               <Box display='flex' className={classes.name} justifyContent='space-between'> <div> {item.name}</div>
                <div> {item.brand}</div>
                </Box>
                <Box display='flex' className={classes.damagesCont}>
                    Damages:  
                    {item.damages && item.damages.map(damages => {
                        return(
                            <span className={classes.dmgItem}>
                                {damages.value}
                                </span>
                        )
                    })}
                </Box>
                <Box display='flex' gridGap='10px' justifyContent='space-between'>
                <button style={{width: '100%', padding: '17px', borderRadius: '15px', border: 'none',
                 background: '#e5e7fe', fontWeight: '600'}} >Edit</button>
                 <button style={{width: '100%', padding: '17px', borderRadius: '15px', border: 'none',
                  background: '#243c92', color: '#fff', fontWeight: '600'}}
                onClick={() => cancelOrder(item)}>Cancel</button>
                </Box>
                </Box>
               )
            }) : 'Repair History Will appear here' }
        </Box>
    )
}

export default Repairs
