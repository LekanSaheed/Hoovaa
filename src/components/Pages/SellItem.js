import React from 'react'
import './sellItem.css'
import sell from '../../assets/sell.png'
import { BsSpeaker, BsTv } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineCamera, AiOutlineDesktop, AiOutlineLaptop } from 'react-icons/ai'
import { IoIosWatch, IoLogoGameControllerB, IoMdPhonePortrait } from 'react-icons/io'
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import HowItWorks from '../HowItWorks'
import PhoneBrands from './PhoneBrands'
import { GlobalContext } from '../../reducers/context'
import Cities from '../Cities'

const SellItem = () => {

    const {state} = GlobalContext()
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    
   const {url, path} = useRouteMatch()
  
    
    const data = [
        {text: 'Phones',
          icon: <IoMdPhonePortrait/>,
          to: '/phone-brands'
},
{text: 'Laptops',
          icon: <AiOutlineLaptop/>,
          to: '/laptop-brands'
},
{text: 'Computers',
          icon: <AiOutlineDesktop/>,
          to: '/computer-brands'
},
{text: 'Gaming Gadgets',
          icon: <IoLogoGameControllerB/>,
          to: '/gaming-gadgets-brands'
},
{text: 'TVs',
          icon: <BsTv/>,
          to: '/tv-brands'
},
{text: 'Cameras',
          icon: <AiOutlineCamera/>,
          to: '/camera-brands'
},
{text: 'Smart Watches',
          icon: <IoIosWatch/>,
          to: '/smart-watch-brands'
},
{text: 'Smart Speakers',
          icon: <BsSpeaker/>,
          to: '/smart-speakers-brands'
}
    ]
    console.log(path)
const history = useHistory()
    return (
        <Switch>
             
        <Route exact path={path}>
        <div className='sell-page-container'>
        <div style={{position: 'sticky', top: '30px', left: '0'}} onClick={() => history.goBack()}><AiOutlineArrowLeft/></div>
            <div className='centered-text'>
                <img src={sell} alt='sell' />
                <span>Sell Your Stuff and Get Cash Instantly</span></div>
            <div className='sell-items-container'>
                <span style={{fontWeight: '500'}}>What would you like to sell?</span>
                <ul>
                    {data.map((item, index) => {
                        return(
                           <li key={index}> 
                           <Link to={url + item.to} className='sale-items'>
                                <span className='sale-icons'>{item.icon}</span>
                                <span>{item.text}</span>
                                </Link>
                          </li>
                        )
                    })}
                </ul>
            </div>
            </div>
            {!state.isCity && <Cities/>}
            <HowItWorks bc='#fafafa' mTop='0px'/>
        </Route>
           
                    <Route  path={`${path + '/phone-brands'}`}>
                        <PhoneBrands device='phone' brands={state.phoneBrands}/>
                    </Route>
                    <Route path={`${path + '/laptop-brands'}`}>
                        <PhoneBrands device='laptop' brands={state.laptopBrands}/>
                    </Route>
                    <Route path={`${path + '/computer-brands'}`}>
                        <PhoneBrands device='computer' brands={state.computerBrands}/>
                    </Route>
                    <Route path={`${path + '/gaming-gadgets-brands'}`}>
                        <PhoneBrands device='gaming Gadget' brands={state.gamingGadgetBrands}/>
                    </Route>
                    <Route path={`${path + '/tv-brands'}`}>
                        <PhoneBrands device='tv' brands={state.tvBrands}/>
                    </Route>
                    <Route path={`${path + '/camera-brands'}`}>
                        <PhoneBrands device='camera' brands={state.cameraBrands}/>
                    </Route>
                    <Route path={`${path + '/smart-watch-brands'}`}>
                        <PhoneBrands device='smart Watch' brands={state.smartWatchbrands}/>
                    </Route>
                    <Route path={`${path + '/smart-speakers-brands'}`}>
                        <PhoneBrands device='smart Speaker' brands={state.smartSpeakerBrands}/>
                    </Route>
           
            <HowItWorks/>
       
        </Switch>
    )
}

export default SellItem
