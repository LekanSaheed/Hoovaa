import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './LgNav.css'

const LgNav = () => {
    const data = [
        {
            text: 'Login',
            link: './login',
            isLogin: true
        },{
        text: 'Services',
        to: 'Buy',
        l1: '/buy-item',
        to2: 'Sell',
        l2: '/sell-item',
        to3: 'Swap',
        l3: '/swap-item',
        to4: 'Repair',
        l4: '/repair-device',
        link: null
    },
    {
        text: 'About',
        to: 'About the team',
        l1: '/team-about',
        to2: 'Terms and Conditions',
        l2: '/terms-and-conditions',
        to3: 'Contact',
        l3: '/contact',
        to4: 'What we do',
        l4: '/about-us',
        link: null
    },
    {
        text: 'Help',
        link: null
    },
    {
        text: 'faq',
        link: null
    }]
    const lgNav = data.map((item, index) => {
        return(
                <ul key={index}>
                    <li style={{padding: '10px'}} className={`${item.to && 'show-hidden' }`}>
                        <Link style={{color: 'black', display: 'flex', alignItems: 'center'}}
                         to={item.link && item.link}>
                            <span style={{backgroundColor: `${item.isLogin && 'royalblue'}`, 
                            color: `${item.isLogin && 'white'}`,
                            padding: `${item.isLogin && '10px 15px'}`,
                            fontSize: `${item.isLogin && '11px'}`,
                            borderRadius: `${item.isLogin && '5px'}`
                            }}>{item.text}</span>{item.to && <FaCaretDown/>}
                            </Link></li>
                    <div className="header-hidden">
                   <Link to={item.l1 && item.l1}><li>{item.to && item.to}</li></Link>
                   <Link to={item.l2 && item.l2}> <li>{item.to2 && item.to2}</li></Link>
                   <Link to={item.l3 && item.l3}> <li>{item.to3 && item.to3}</li></Link>
                   <Link to={item.l4 && item.l4}> <li>{item.to4 && item.to4}</li></Link>
                    
                    </div>
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
