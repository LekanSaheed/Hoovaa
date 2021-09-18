
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { CgNotifications } from 'react-icons/cg'
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineHistory, AiOutlineInbox, AiOutlineInfoCircle} from 'react-icons/ai'
import React from 'react'
import userImg from '../assets/user.png'
import { GlobalContext } from '../reducers/context'
import ProfileSettings from './ProfileSettings'
import './Account.css'
import { MdKeyboardArrowRight } from 'react-icons/md'
import BottomNav from '../components/BottomNav'
import { FaRegAddressBook, FaTools } from 'react-icons/fa'
import AddressBook from './AddressBook'
import Orders from './Orders'
import Repairs from './Repairs'
import {Helmet} from 'react-helmet'
// import { firebase } from '../components/firebase'

const Account = () => {
    React.useEffect(() => {
        window.scrollTo(0,0)
    })
    const {state} = GlobalContext()
    const currentUser = state.currentUser
    const mainData = [
        {
            text: 'My Orders',
            icon: <AiOutlineInbox/>
        },
        {
            text: 'Gadget Sales History',
            icon: <AiOutlineHistory/>
        },
        {
            text: 'My Address Book',
            icon: <FaRegAddressBook/>
        },
        {
            text: 'My Repair History',
            icon: <FaTools/>
        }
     
    ]
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
  
    return (
        <>
      <Switch>
          <Route exact path={path}>
          <div className='account-page'>
              <Helmet>
                  <title>{currentUser.displayName ? currentUser.displayName + "'s Account" : 'My Hoovaa Account'}</title>
                  <meta name='description' content='Hoovaa account, login, 
                  hoovaa login, sign up, hoovaa, sign in, buy, sell, swap, repair, hoova repair'/>
              </Helmet>
          <BottomNav/>
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
               {mainData.map((item, idx) => {
                   return(
                       <Link key={idx} className='account-links-child' to={`${url}/${item.text.toLowerCase().replace(/ /g, '-')}`}>
                           <div className='link-flex'>
                               <div className='account-icon'>
                                   {item.icon}
                               </div>
                               <div>
                                   {item.text}
                               </div>
                           </div>
                           <MdKeyboardArrowRight/>
                       </Link>
                   )
               })}
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
          <Route path={path + '/my-address-book'}>
              <AddressBook/>
          </Route>
               <Route path={path + '/my-orders'} component={Orders}/>
               <Route path={path + '/my-repair-history'} component={Repairs}/>
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
