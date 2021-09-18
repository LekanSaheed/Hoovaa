import React from 'react'
import './sellItem.css'
import sell from '../../assets/sell.png'
import { BsSpeaker, BsTv } from 'react-icons/bs'
import { AiOutlineCamera, AiOutlineDesktop, AiOutlineLaptop } from 'react-icons/ai'
import { IoIosWatch, IoLogoGameControllerB, IoMdPhonePortrait } from 'react-icons/io'
import {FiArrowLeftCircle} from 'react-icons/fi'
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import HowItWorks from '../HowItWorks'
import Brands from './Brands'
import { GlobalContext } from '../../reducers/context'
import Cities from '../Cities'
import BottomNav from '../BottomNav'
import {Helmet} from 'react-helmet'
const SellItem = () => {

    const {state} = GlobalContext()
    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    
   const {url, path} = useRouteMatch()
  
    
    const data = [
        {text: 'Phones',
          icon: <IoMdPhonePortrait/>,
},
{text: 'Laptops',
          icon: <AiOutlineLaptop/>,
},
{text: 'Computers',
          icon: <AiOutlineDesktop/>,
         
},
{text: 'Gaming Gadgets',
          icon: <IoLogoGameControllerB/>,
         
},
{text: 'TVs',
          icon: <BsTv/>,
        
},
{text: 'Cameras',
          icon: <AiOutlineCamera/>,
         
},
{text: 'Smart Watches',
          icon: <IoIosWatch/>,
     
},
{text: 'Smart Speakers',
          icon: <BsSpeaker/>,
    
}
    ]
   
const history = useHistory()
    return (
        <Switch>
             
        <Route exact path={path}>
       
        <div className='sell-page-container'>
            <Helmet>
                <title>Sell gadgets</title>
                <meta name='description' content='Sell your used gadgets, sell your used phones, sell your used laptop, hoovaa, hoovaa sell, 
                sell old gadgets, sell unused gadgtes for cash, sell your old stuff instantly, sell, cash, hoovaa cash, money, laptop, old laptop, 
                old smartphones, old'/>
            </Helmet>
            <BottomNav current='sell'/>
        <div style={{alignSelf: 'flex-start',
    margin: '15px'}} onClick={() => history.goBack()}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', color: 'grey'}}><FiArrowLeftCircle/><span style={{marginLeft: '5px', fontSize: '11px'}} >Go Back</span>
            </div>
            </div>
            <div className='centered-text'>
                <img src={sell} alt='sell' />
                <span>Sell Your Stuff and Get Cash Instantly</span></div>
            <div className='sell-items-container'>
                <span style={{fontWeight: '500'}}>What would you like to sell?</span>
                <ul>
                    {data.map((item, index) => {
                        return(
                           <li key={index}> 
                           <Link to={url + '/' + item.text.toLowerCase().replace(/ /g, '-') + ' brands'.replace(/ /g, '-')} className='sale-items'>
                                <span className='sale-icons'>{item.icon}</span>
                                <span>{item.text}</span>
                                </Link>
                          </li>
                        )
                    })}
                </ul>
            </div>
            </div>
            {state.isCity && <Cities/>}
            <HowItWorks bc='#fafafa' mTop='0px'/>
        </Route>
           
                    <Route  path={`${path + '/phones-brands'}`}>
                        <Brands device='phone' brands={state.phoneBrands}/>
                    </Route>
                    <Route path={`${path + '/laptops-brands'}`}>
                        <Brands device='laptop' brands={state.laptopBrands}/>
                    </Route>
                    <Route path={`${path + '/computers-brands'}`}>
                        <Brands device='computer' brands={state.computerBrands}/>
                    </Route>
                    <Route path={`${path + '/gaming-gadgets-brands'}`}>
                        <Brands device='gaming Gadget' brands={state.gamingGadgetBrands}/>
                    </Route>
                    <Route path={`${path + '/tvs-brands'}`}>
                        <Brands device='tv' brands={state.tvBrands}/>
                    </Route>
                    <Route path={`${path + '/cameras-brands'}`}>
                        <Brands device='camera' brands={state.cameraBrands}/>
                    </Route>
                    <Route path={`${path + '/smart-watches-brands'}`}>
                        <Brands device='smart Watch' brands={state.smartWatchbrands}/>
                    </Route>
                    <Route path={`${path + '/smart-speakers-brands'}`}>
                        <Brands device='smart Speaker' brands={state.smartSpeakerBrands}/>
                    </Route>
           
            <HowItWorks/>
       
        </Switch>
    )
}

export default SellItem
