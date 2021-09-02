import React from 'react'
import './Cards.css'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import cashman from '../assets/newoip.png'
import trash from '../assets/trash.jpg'
import phone from '../assets/phone.png'
import repair from '../assets/repair.png'
import { Fab } from '@material-ui/core'

const cardData = [
    {
        titleText: 'Sell your device',
        subText: 'Sell your old phone',
        lastText: 'Get latest resale value for your device',
        img: phone
    },
    {
        titleText: 'Get Cash for your old device',
        subText: 'Planning to dispose it? Sell it.',
        lastText: 'Get latest resale value for your device',
        img: trash
    },
    {
        titleText: 'Got a bad phone? ',
        subText: 'Repair it',
        lastText: 'Over 1000 personnel to help fix it',
        img: repair
    },
    {
        titleText: 'Sell your device',
        subText: 'Sell your old phone',
        lastText: 'Get latest resale value for your device'
    }
]
const Cards = () => {
    const cardList = cardData.map((item, index) => {
        return(
            <div className='cards' key={index}>
               <div className='text-group'>
               <p className='title-text'>{item.titleText}</p>
                <p className='sub-text'>{item.subText}</p><hr style={{backgroundColor: 'white', border: 'solid 1px white', width: '50px'}}/>
                <p className='last-text'>{item.lastText}</p>
               </div>
               <div style={{display: 'flex', flexDirection: 'column'}}> 
                   <img src={item.img} alt='icons'/>
                   <button><AiOutlineArrowRight style={{fontSize: '20px'}}/></button>
               </div>
              
            </div>
        )
    })
    const [cont, setCont] = React.useState(null)
React.useEffect(() => {
    const cc = document.querySelector('#cardCon')
    console.log(cc)
    setCont(cc)
}, [])

const handleScroll = () => {
    cont.scrollLeft += 290
}
const handleRightScroll = () => {
    cont.scrollLeft += -290
}
    return (
        <div>
            {/* LargeScreen image */}
            <div className='lg-card'>
                
               <div>
               <span>Sell Your Device</span>
                <p>Get resale Value for your old device</p>
                <span>Sell Now</span>
               </div>
               <div>
                   <img src={cashman} alt='cashman'/>
               </div>
            </div>

            {/* Small screen cards */}
           
            <div className='card-container' id="cardCon">
            {cardList}
            </div>
            
       <div className='btn-fixed'> <Fab size='small'  onClick={handleRightScroll}><AiOutlineArrowLeft/></Fab></div>
       <div className='btn-fixed-right'> <Fab size='small' onClick={handleScroll}><AiOutlineArrowRight/></Fab> </div>
       </div>
       
    )
}

export default Cards
