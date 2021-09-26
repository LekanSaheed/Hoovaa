import { Box, Button, makeStyles, Modal, DialogContent, Dialog, Badge } from '@material-ui/core'
import React, {useState} from 'react'
import { db } from '../components/firebase'
import { GlobalContext } from '../reducers/context'
import {AiOutlineCheck, AiOutlineCloseCircle} from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'

const Repairs = () => {
    const {state} = GlobalContext()
 const [modal, setModal] = useState(false)
 const [error, setError] = useState('')
 const [loaded, setLoad] = useState(false)
 const repairs = state.repairDataAdmin
 
    React.useEffect(() => {
        // const repairData = []
        window.scrollTo(0,0)
        // const docRef = db.collection('repairs')
        // docRef.onSnapshot(snapshot => {
        //     snapshot.forEach(doc => {
        //         const {name, brand, model, damages, isRepaired, repairId, customerId} = doc.data()
        //         repairData.push({
        //             name, brand, model, damages, isRepaired, repairId,
        //             customerId,
        //             id: doc.id
        //         })
        //         console.log(repairData)
        //         setRepairs(repairData)
        //     })
           
        // })
    
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
        },
        status: {
            color: 'green',
            fontWeight: '600'
        },
        statusBad: {
            color: '#c41e3a',
            fontWeight: '600'
        },
        link: {
            padding: '10px',
            color: 'black',
            fontWeight: '600',
            fontSiz: '18px'
        }
    }))
    const classes = useStyle()
    const {setModalStat} = GlobalContext()
 
    const updateRepairDoc = (item) => {
        const loader = document.querySelector('.loader-container')
        loader.classList.remove('loader-hide')
        const docRef = db.collection('repairs').doc(item.id)
        const custRef = db.collection('users').doc(item.customerId).collection('repairHistory').doc(item.repairId)  
       console.log(item)
        custRef.update({
            isRepaired: true
        })  
        .then(()=> {
            docRef.update({isRepaired: true})  
           
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
            setError(err.message)
            setModalStat('Something Went wrong')
            loader.classList.add('loader-hide')
        })
        return;
    }
    const updateCollectedStatus = (item) => {
        const loader = document.querySelector('.loader-container')
        loader.classList.remove('loader-hide')
        const docRef = db.collection('repairs').doc(item.id)
        const custRef = db.collection('users').doc(item.customerId).collection('repairHistory').doc(item.repairId)  
       console.log(item)
        custRef.update({
           personnelReturned: true
        })  
        .then(()=> {
            docRef.update({personnelReturned: true})  
           
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
            setError(err.message)
            setModalStat('Something Went wrong')
            loader.classList.add('loader-hide')
        })
        return;
    }
    const {path, url } = useRouteMatch()
    return (
       <Switch>
           <Route path={path} exact>
           <Box className={classes.root}>
           
           New Repair Orders will appear here
           {error && error}
           <Box>
               {loaded ? null : 'Loading'}
               <Link to={url + '/new-repair-orders'}><Box className={classes.link} display='flex' justifyContent='space-between' >
                   <span>
                       <Badge badgeContent={0} color='secondary' children='New Repair Orders' showZero={true}/>
                   </span>
                   <span>
                       <MdKeyboardArrowRight/>
                   </span></Box></Link>

                   <Link to={url + '/repaired-gadgets'}>
                       <Box className={classes.link} display='flex' justifyContent='space-between' >
                   <span>
                       <Badge badgeContent={0} color='secondary' children='Repaired Gadgets' showZero={true}/>
                   </span>
                   <span>
                       <MdKeyboardArrowRight/>
                   </span></Box></Link>

           </Box>

           
         
       </Box>
           </Route>
<Route path={path + '/repaired-gadgets'}>
<Box>
       {React.Children.toArray(
           repairs.filter(i => i.isRepaired === true).map(repair => {
               return(
                   <Box className={classes.gadgets} display='flex' flexDirection='column' onLoad={() => setLoad(true)}>
                     
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
                      {repair.personnelReturned ? 'Returned' : 'Not Returned'}
                       </Box>
                       {/* <Button onClick={() => updateRepairDoc(repair)}>
                           Change Status
                       </Button><br/> */}

                       {repair.isRepaired && !repair.personnelReturned ? <Button variant='contained' color='primary' 
                       onClick={() => updateCollectedStatus(repair)}>
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
</Route>
           <Route path={path + '/new-repair-orders'}>
      {React.Children.toArray(
           repairs.filter(i => i.isRepaired === false).map(repair => {
               return(
                   
                   <Box className={classes.gadgets} display='flex' flexDirection='column' onLoad={() => setLoad(true)}>
                     <div>Date: {repair.created.toDate().toDateString()}</div>
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
                           <Button onClick={() => updateRepairDoc(repair)}>
                               Change Status
                           </Button>
                           {repair.isRepaired &&  <Button variant='contained' color='primary' onClick={() => updateCollectedStatus(repair)}>
                               Set Return Status
                           </Button>}
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
      </Route>
       </Switch>
    )
}

export default Repairs
