import React from 'react'
import './Cards.css'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import cashman from '../assets/newoip.png'
//import trash from '../assets/trash.jpg'
import phone from '../assets/phone.png'
//import repair from '../assets/repair.png'
import { Button, Fab, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'


const cardData = [
    {
        titleText: 'Sell your device',
        subText: 'Sell your old phone',
        lastText: 'Get latest resale value for your device',
        class: 'handphone',
        variant: true,
        link: '/sell-item'
    },
    {
        titleText: 'Get Cash for your old device',
        subText: 'Planning to dispose it? Sell it.',
        lastText: 'Get latest resale value for your device',
        class: 'cashman',
        child: 'Sell Now',
        link: '/sell-item'
    },
    {
        titleText: 'Got a bad phone? ',
        subText: 'Repair it',
        lastText: 'Over 1000 personnel to help fix it',
        class: '',
        child: 'Repair Now',
        link: '/repair-device',
        img: phone
    },
    {
        titleText: 'Buy from us',
        subText: 'We got what you want',
        lastText: 'Get latest devices, you name it',
        class: 'repair',
        child: 'Buy Now',
        link: '/buy-item'
    }
]
const Cards = () => {

    const useStyles = makeStyles({
        root: {
            background: 'black',
            color: 'white',
            fontSize: '8px'
        },
        isRound: {
            backgroundColor: 'white',
            color: 'black',
            fontSize: '17px'
        }
    })

    const classes = useStyles()
    const cardList = cardData.map((item, index) => {
        return(
            <Link to={item.link} key={index}>
            <div className={`cards ${item.class}`} >
               <div className='text-group'>
               <p className='title-text'>{item.titleText}</p>
                <p className='sub-text'>{item.subText}</p><hr style={{backgroundColor: 'white', border: 'solid 1px white', width: '50px'}}/>
                <p className='last-text'>{item.lastText}</p>
               </div>
               <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}> 

                  {item.img && <img style={{margin: '0'}} className='blob' src={item.img} alt='icons'/>}
                  <div></div>
                 {item.variant &&  <Fab size='small' variant='extended' className={classes.isRound} children={<AiOutlineArrowRight/>}/>}
                 {item.child &&  <Button size='small' className={classes.root} children={<span>{item.child}</span>}/>}
                   {/* <button><AiOutlineArrowRight style={{fontSize: '20px'}}/></button> */}
               </div>
              
            </div>
            </Link>
        )
    })
    const [cont, setCont] = React.useState(null)
React.useEffect(() => {
    const cc = document.querySelector('#cardCon')
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
