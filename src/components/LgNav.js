import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { Link} from 'react-router-dom'
import { GlobalContext } from '../reducers/context'
import './LgNav.css'

const LgNav = () => {
    const {state} = GlobalContext()
 const data = [
        {
            text: !state.isUser ? 'Login' : 'Account',
            link: state.isUser ? '/account' : './login',
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
    },
    {
        text: 'Help',
        link: '/help'
    },
    {
        text: 'faq',
        link: '/faq'
    }]
   
    const lgNav = data.map((item, index) => {
        return(
                <ul key={index}>
                    {/* Login button */}
                    <li style={{padding: '10px'}} className={`${item.to && 'show-hidden' }`}>
                        <Link style={{color: 'black', display: 'flex', alignItems: 'center'}}
                         to={item.link}>
                            <span style={{backgroundColor: `${item.isLogin && '#7497ff'}`, 
                            color: `${item.isLogin && 'white'}`,
                            padding: `${item.isLogin && '10px 15px'}`,
                            fontSize: `${item.isLogin && '11px'}`,
                            borderRadius: `${item.isLogin && '5px'}`,
                            fontWeight: `${item.isLogin && '700'}`
                            }}>{ item.text && item.text}</span>{item.to && <FaCaretDown/>}
                            </Link></li>
                            {/* login button code ends here */}

                   <div className='header-hd-con'>
                           <div className='connector'></div>  
                    <div className="header-hidden">
                   <Link to={item.l1 && item.l1}><li>{item.to && item.to}</li></Link>
                   <Link to={item.l2 && item.l2}> <li>{item.to2 && item.to2}</li></Link>
                   <Link to={item.l3 && item.l3}> <li>{item.to3 && item.to3}</li></Link>
                   <Link to={item.l4 && item.l4}> <li>{item.to4 && item.to4}</li></Link>
                    
                    </div>
                   </div>
                    <div className='hidden-bg'></div>
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
