import React, { useState } from 'react'

import { GlobalContext } from '../reducers/context'
import {firebase} from '../components/firebase'
import {Link, Redirect} from 'react-router-dom'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {setUser, state} = GlobalContext()
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
        })
        .catch(err => {
            console.log(err.message, err.code)
            setError(err.message)
        })
    }
    if(state.isUser){
        return <Redirect to='/account'/>
    }
    return (
        <div className='login-form-container'>
            <form className='login-form'>
                <span style={{color: '#7497ff', fontWeight: '500', textAlign: 'center'}}>LOGIN TO HOOVAA</span>
                <span style={{color: 'red', fontSize: '11px'}}>{error && error}</span>
            <div className='form-input-cont'>
                <label>Email</label>
                <input type='email' placeholder='Email' required onChange={(e) => {
                     setEmail(e.target.value)
                     setError('')
                    }
                }/>
            </div>
            <div className='form-input-cont'>
                <label>Password</label>
                <input type='email' placeholder='Password' required onChange={(e) => {
                     setPassword(e.target.value)
                     setError('')
                }
                }/>
            </div>
            <div className='form-input-cont'>

                <button className='login-form-btn' style={{background: `${!email || !password ? 'lightgrey' : '#7497ff'}`}} onClick={handleSubmit} disabled={!email || !password}>LOGIN TO HOOVAA</button>
            </div>
            </form>
            <div className='signup-and-reset'>
                <span>New to Hoovaa? <Link to='/signup'>Sign Up</Link></span><br/>
                <span>Forgot PassWord? <Link to='/reset-password'>Reset</Link></span>
            </div>
        </div>
    )
}

export default Login
