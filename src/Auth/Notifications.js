import { Box, Button, Dialog, Modal, Paper } from '@material-ui/core'
import React, {useState} from 'react'
import { FaTrash } from 'react-icons/fa'
import { db } from '../components/firebase'
import { GlobalContext } from '../reducers/context'

const Notifications = () => {
    const {state, setModalStat} = GlobalContext()
    const [notifications, setNotifications] = useState([])
    React.useEffect(()=> {
        const loader = document.querySelector('.loader')
        loader.classList.remove('loader-hide')
        let arr = []
        db.collection('notifications')
        .where('customerId', '==', state.currentUser.uid)
        .orderBy('created', 'asc')
        .onSnapshot(snapshot => {
            arr = []
            snapshot.forEach(doc => {
                doc.data().id = doc.id
                arr.push(doc.data())
                setNotifications(arr)
                loader.classList.add('loader-hide')
            })
        })
    },[state.currentUser.uid])
    const [modal, setModal] = useState(false)
  
    
    return (
        <div>
           
            <div className='centered-text'>Notifications</div>
            <Box padding='10px'>{notifications && <div>{ notifications.filter(i => i.read === false).length === 0 ? 'No ' :
             notifications.filter(i => i.read === false).length} new Notifications</div>}</Box>
             <Paper>
            {React.Children.toArray(
                notifications.length < 1 ? <>'No notifications yet'</> : notifications.map(notif => {
                    const notifAbout = <Box padding='10px'><div>{notif.message }</div>
    <div>{ notif.attachments.name && notif.attachments.name}</div>
    <div>{notif.attachments.model &&  notif.attachments.model}</div>
   <div>{notif.attachments.brand &&  notif.attachments.brand}</div>   
   <div>{ notif.attachments.damages && notif.attachments.damages.map(item => item.label)}</div> 
   <Box display='flex' justifyContent='space-between'>
       <Button onClick={() => setModal(false)} size='small' 
       variant='contained' color='primary' children='Close'/>
       <Button size='small' 
       variant='contained' color='secondary' 
   children='Delete' onClick={() => {
       const selfRef = db.collection('notifications').where('repairId', '==', notif.repairId)
       selfRef.get().then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          doc.ref.delete()
          .then(() => {
            setModalStat('Notification Successfully deleted')
            setModal(false)
          })
          .catch(() => {
              setModalStat('Something Went wrong')
          })
        })
      
   })}}
   /></Box>
    </Box> 
                    return(
                       <>
                 {modal && <Modal open={modal} children={<Dialog open={modal}
                        children={<>{notifAbout}</>} />} />}
                        <Box style={{border: 'solid 1px #fafafa', fontWeight: !notif.read && 'bold', color: notif.read &&
                        'grey'}} display='flex' alignItems='baseline' onClick={() => {
                          
                                const selfRef = db.collection('notifications').where('repairId', '==', notif.repairId)
                                selfRef.get().then((querySnapshot)=> {
                                 querySnapshot.forEach((doc)=> {
                                   doc.ref.update({read: true})
                                   .then(() => {
                                    
                                     setModal(true)
                                   })
                                   .catch(() => {
                                       setModalStat('Something Went wrong')
                                   })
                                 })
                               
                            })
                          
                            
                            console.log(notif)
                        }}
                             justifyContent='space-between'  padding='10px'>
                                <div>{notif.message}</div>
                            <div style={{color: 'maroon'}}>{<FaTrash/>}</div>
                            </Box> 
                           
                        
                       </>
                    )
                })
            )}
            </Paper>
        </div>
    )
}

export default Notifications
