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
      .catch((error) => {
        setErr(error)
        console.log(err)
      })
  }
  const history = useHistory()
    return (
        <div>
            

            DO YOU REALLY WANT TO LogOut
            
            <button onClick={handleLogout}>Yes</button>
            <button onClick={() => history.goBack()}>No</button>
            {err && err}
        </div>
    )
}

export default LogOut
