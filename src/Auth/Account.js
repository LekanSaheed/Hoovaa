
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { CgNotifications } from 'react-icons/cg'
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import React from 'react'
import userImg from '../assets/user.png'
import { GlobalContext } from '../reducers/context'
import ProfileSettings from './ProfileSettings'
import './Account.css'
import { MdKeyboardArrowRight } from 'react-icons/md'
// import { firebase } from '../components/firebase'

const Account = () => {
    const {state} = GlobalContext()
    const currentUser = state.currentUser
    const data = [
        {text : "Profile Setting",
        icon: <FiSettings/>,

    },
    {text : "Notifications",
    icon: <CgNotifications/>,
    
},
{text : "Password Management",
icon: <RiLockPasswordLine/>,

},
{text : "Logout",
icon: <FiLogOut/>,

}
    ]
    const {path, url} = useRouteMatch()
console.log(currentUser)
    return (
        <>
      <Switch>
          <Route exact path={path}>
          <div className='account-page'>
              {!currentUser.emailVerified && <div style={{border: 'solid 1px lightgrey', padding: '10px', fontSize: '12px'}}>
                  <span style={{color: 'goldenrod', marginRight: '10px'}}><AiOutlineInfoCircle/></span><span>Email not verified</span></div>}
            <h3 className='theme-text account-title'>Account</h3>
           <div className="account-greeting">
        <img src={currentUser.photoUrl ? currentUser.photoUrl : userImg} alt='dp'/>
        <div>
        { currentUser.displayName ? 'Welcome ' + currentUser.displayName : 'Welcome'}
        </div>
           </div>
            <div className='account-links'>
               {data.map((item, idx) => {
                   return(
                       <Link className='account-links-child' to={item.text === "Logout" ? '/logout' : url + '/' + item.text.toLowerCase().replace(/ /g, '-')} key={idx}>
                          <div className='link-flex'>
                               <div className="account-icon">{item.icon}</div>
                               <div>
                                   {item.text}
                                </div>
                                </div> 
                                   <MdKeyboardArrowRight/>
                       </Link>
                   )
               })}
            </div>
            
        </div>
          </Route>

          <Route path={path + '/profile-setting'}>
              <ProfileSettings/>
          </Route>
     
     
      </Switch>
          <div className='account-footer'>
         <div className='af-child'>
              <span className='theme-text'>Have a question? </span>
          <span className='af-node'>
             Talk to our customer care agents
              </span>
        </div>
      </div>
      </>
    )
}

export default Account
