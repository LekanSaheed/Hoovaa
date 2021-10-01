import { Dialog } from '@material-ui/core'
import { Box, Paper, Modal, DialogContent, DialogActions, Button} from '@material-ui/core'
import React,{useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Link, useRouteMatch} from 'react-router-dom'
import "./SwapGadget.css"
const SwapGadget = () => {
    const [caption, setCaption] = useState(true)
    const [modal, setModal] = useState(false)
   const {url} = useRouteMatch()
    const swapLinks = [
        {
            text: 'Phone',
        icon: ''},
        {
        text: 'Laptop',
    icon: ''},
    {
    text: 'Tablet',
icon: ''}
    ]

    return (
       <div>
          {sessionStorage.getItem('caption') ? null : caption && 
           <Box display='flex' style={{background: '#EDF1FA', border: 'solid 2px #bebebe', fontSize: '14px'}} justifyContent='space-between' gridGap='20px' padding='10px'>
               <div>
            Humpty, Dumpty, Good luck brought you here, tired of your gadget? Give it a swap.
               </div>

               <span onClick={() => {
                   setCaption(false)
                   sessionStorage.setItem('caption', false)
               }}>
               <AiOutlineClose/>
               </span>
           </Box>}
           {modal && <Modal open={modal} children={<Dialog open={modal}
           children={<DialogContent 
            children={<DialogActions>
               <Box display='flex' flexDirection='column'>
               <div>
                    Select your device and its conditions if any, then choose the device you wanna swap with, so easy
                </div>
                <Button 
           onClick={() => setModal(false)}>Got it</Button>
               </Box>
               </DialogActions>}/>} />}/>}
            <div className="centered-text">
            What would you like to swap?
        </div>
        <Paper>
            <div className="blob" onClick={() => setModal(true)}>Swap</div>
                <Box display='flex' justifyContent='center' gridGap='10px'>
                        {React.Children.toArray(
                            swapLinks.map(children => {
                                return(
                                   <Link to={url + '/' + children.text.toLowerCase()} 
                                   onClick={() => {
                                    sessionStorage.setItem('swaplink',
                                    url + '/' + children.text.toLowerCase())
                                    localStorage.setItem('swap-item', JSON.stringify(children))
                                   }}>
                                    <Box flex='1' flexBasis='100%' className='sale-item' padding='10px'>
                                        {children.text}
                                    </Box>
                                   </Link>
                                )
                            })
                        )}
                </Box>
        </Paper>
       </div>
    )
}

export default SwapGadget
