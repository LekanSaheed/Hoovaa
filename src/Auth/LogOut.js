import { Box, Button, Dialog, DialogContent, DialogTitle, Modal } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { firebase} from '../components/firebase'
import { GlobalContext } from '../reducers/context'

const LogOut = () => {
    const {logout} = GlobalContext()
    const [err, setErr] = React.useState('')
  const  handleLogout = () => {
      firebase.auth().signOut()
      .then(() => {
       
       history.push('/login')
        logout()
      })
      .then(() =>  window.location.reload())
      .catch((error) => {
        setErr(error)
      })
  }
  const history = useHistory()
  const dialog =   <Box display='flex' justifyContent='space-between' padding='10px'>
  <Button variant='contained' color='secondary' onClick={handleLogout}>Yes</Button>
    <Button variant='outlined' color='primary' onClick={() => history.goBack()}>No</Button>
  </Box>
    return (
        <div>
            
        <Modal open={true} children={<Dialog fullWidth={true} children={<div>
          <DialogTitle>Do You Really Want to Logout</DialogTitle>
          <DialogContent>
          {dialog}
          </DialogContent>
        </div>} open={true}/>} />
            {err && err}
        </div>
    )
}

export default LogOut
