import React,{useState} from 'react'
import {firebase} from '../components/firebase'
//import { GlobalContext } from '../reducers/context'



const ProfileSettings = () => {
  //  const {state} = GlobalContext()
    // const user = firebase.auth().currentUser
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState(null)
 //   const [photoURL, setPhotoUrl] = useState('')
    const [userEmail, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleFile = (e) => {
        setPhoto(e.target.files[0])
    }
    const handleUpdate = (e) => {
        e.preventDefault()
     firebase.auth().onAuthStateChanged(user => {
         if(user){
            user.updateProfile({
                displayName: name,
                photoURL: photo
            })
            .then(() => {
                setSuccess('Succesfully Updated pROFILE')
                setError('')
            }).catch(err => {
                setError(err.message, err.code)
            })
         }
     })
    }

    return (
        <div>
          <div className='centered-text'>Update Profile</div>
            <form style={{padding: '10px'}}>
                {error && error}
                {success && success}
                <div >
                    <input value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <input type='file' onChange={handleFile}/>
                </div>
                <div>
                    <input value={userEmail} type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button onClick={handleUpdate}>Update Profile</button>
            </form>
        </div>
    )
}

export default ProfileSettings
