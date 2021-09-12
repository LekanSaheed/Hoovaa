import React, { useState } from 'react'
import { TextField} from '@material-ui/core'
import { GlobalContext } from '../reducers/context'
import {firebase} from '../components/firebase'
import {Link, Redirect, useHistory} from 'react-router-dom'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
const loader = document.querySelector('.loader-container')
    const {setUser, state} = GlobalContext()
    const handleSubmit = (e) => {
        e.preventDefault()
        loader.classList.remove('loader-hide')
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user
            loader.classList.add('loader-hide')
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
          history.goBack()
        })
        .catch(err => {
            console.log(err.message, err.code)
            setError(err)
            loader.classList.add('loader-hide')
        })
    }
    if(state.isUser){
        return <Redirect to='/account'/>
    }
    return (
        <div className='login-form-container'>
            <form className='login-form'>
                <span style={{color: '#7497ff', fontWeight: '500', textAlign: 'center'}}>LOGIN TO HOOVAA</span><br/>
                <span style={{color: 'red', fontSize: '11px'}}>{error && error.message}</span>
            <div className='form-input-cont'>
                
                <TextField label='email' variant='standard' error={error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential' ? true : false }
                 fullWidth={true} disableUnderline={!error} type='text' placeholder='Email' value={email} required onChange={(e) => {
                     setEmail(e.target.value)
                     setError('')
                    } }/>
            </div>
            <div className='form-input-cont'>
               
                <TextField label='password' error={error.code === 'auth/invalid-credential' && true} fullWidth={true} disableUnderline={!error} type='password' placeholder='Password'
                 value={password} required onChange={(e) => {
                     setPassword(e.target.value)
                     setError('')
                    } }/>
            </div>
            <div className='form-input-cont'>

                <button className='login-form-btn' style={{background: `${!email || !password ? 'lightgrey' : '#7497ff'}`}} onClick={handleSubmit} disabled={!email || !password}>LOGIN TO HOOVAA</button>
            </div>
            </form>
            <div className='signup-and-reset'>
                <div>New to Hoovaa? <Link to='/signup'>Sign Up</Link></div>
                <div>Forgot PassWord? <Link to='/reset-password'>Reset</Link></div>
            </div>
        </div>
    )
}

export default Login
