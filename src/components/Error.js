import { } from '@material-ui/core'
import React from 'react'
import './Error.css'

const Error = () => {
    return (
        <div className='error-container'>
            <div className='ball ball1'></div>
            <div>
            <p className='error-code'>404</p>
            <p>Page not found</p>
            </div>
            <div className='ball ball2'></div>
        </div>
    )
}

export default Error
