import React from 'react'
import './LgNav.css'

const LgNav = () => {
    const data = [
        {
            text: 'Login',
            to: ''
        },{
        text: 'Services',
        to: ''
    },
    {
        text: 'About',
        to: ''
    },
    {
        text: 'Help',
        to: ''
    },
    {
        text: 'faq',
        to: ''
    }]
    const lgNav = data.map((item, index) => {
        return(
                <ul key={index}>
                    <li>{item.text}</li>
                </ul>
        )
    })
    return (
        
        <div   className='lg-nav'>
            {lgNav}
        </div>
    )
}

export default LgNav
