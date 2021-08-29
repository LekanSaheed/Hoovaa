import React,{ useState} from 'react'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import { firebase } from '../components/firebase'
const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [modal, setModal] = useState(false)
const {path} = useRouteMatch()
//const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
    //   const  {email, password, firstName, lastName} = inputs
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            const displayName = firstName
            firebase.auth().currentUser.updateProfile({displayName})
            
        })
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user))
        })
        .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({firstName, lastName, email})
        })
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                setModal(true)
            })
        })
        .catch(err => {
            setError(err.message)
        })
    }
    return (
        <div className='login-form-container'>
            {modal && 
            <div className='login-form-container verify-modal-container'>
                <div className="login-form">
                    A Verification Email Has been sent to {email} <button onClick={() => {
                        setModal(false)
                        window.location.reload()
                    }}>close</button>


                   <button onClick={() => firebase.auth().currentUser.sendEmailVerification()}> resend email</button>
                </div>
                </div>}
        <form className='login-form'>
          <Switch>
              <Route path={path}>
              <span style={{color: '#7497ff', fontWeight: '500', textAlign: 'center'}}>Sign Up</span><br/>
            <span style={{color: 'red', fontSize: '11px'}}>{error && error}</span>
            <div className='form-input-cont'>
            <label>First Name</label>
            <input type='text' placeholder='First Name' value={firstName} required onChange={(e) => {
                 setFirstName(e.target.value)
                 setError('')
            }
            }/>
        </div>
        <div className='form-input-cont'>
            <label>Last Name</label>
            <input type='text' placeholder='Last Name' value={lastName} required onChange={(e) => {
                 setLastName(e.target.value)
                 setError('')
            }
            }/>
        </div>
        <div className='form-input-cont'>
            <label>Email</label>
            <input type='email' placeholder='Email' value={email} required onChange={(e) => {
                 setEmail(e.target.value)
                 setError('')
                }
            }/>
        </div>
        <div className='form-input-cont'>
            <label>Password</label>
            <input type='password' placeholder='Password' value={password} required onChange={(e) => {
                 setPassword(e.target.value)
                 setError('')
            }
            }/>
        </div>
        <div className='form-input-cont'>

            <button className='login-form-btn' style={{background: `${!email || !password ? 'lightgrey' : '#7497ff'}`}} onClick={handleSubmit}
             disabled={!email || !password}>SIGN UP</button>
        </div>
              </Route>
            <Route path={path + '/verify-email'}>
               A verification link has been sent your Email address
            </Route>
          </Switch>
        </form>
        <div className='signup-and-reset'>
            <span>Already Have an Account? <Link to='/login'>Log In</Link></span><br/>
        </div>
    </div>
    )
}

export default SignUp
