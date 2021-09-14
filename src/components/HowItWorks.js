import React from 'react'
import './HowItWorks.css'
import pricing from '../assets/pricing.png'
import driver from '../assets/driver.png'
import buying from '../assets/buying.png'
const HowItWorks = ({bc, mTop}) => {
    const details = [
        {
            id: 1,
            img: pricing,
            title: 'Check price',
            text: 'Select your device & tell us about its current condition, our advanced Ai tech will make the perfect price for you'
        },
        {
            id: 2,
            img: driver,
            title: 'Schedule Pickup',
            text: 'Book a pickup, whether home or work, our personnel gets there'
        },
        {
            id: 3,
            img: buying,
            title: 'Get Paid',
            text: 'You get paid as soon as our personnel picks up your device'
        }
    ]
    return (
        <div>
            <div className='how-container' style={{backgroundColor: bc, marginTop: mTop}}>
                <span className='how-cont-title'>How it works</span>
                    <div className='how-child-flex'>
                          {details.map(item => {
                              return(
                                      <div className='how-flex' key={item.id}>
                                          {/* <AiOutlineCloseCircle style={{marginBottom: '-40px'}}/> */}
                                <img className='how-img' src={item.img} alt='how'/>
                    <div className='how-group'>
                        {/* <Badge color="secondary" overlap='rectangular' anchorOrigin={{horizonttal: 'left', vertical: }} showZero={true}  badgeContent={item.id} >
                            {item.title}
                        </Badge> */}
                    <div className='title-and-serial'>
                     <span className='how-serial'>
                    {item.id}
                    </span> 
                      <span className='serial-title'>
                          {item.title}</span>
                    </div>
                    <div className='how-node'>{item.text}</div>
                    </div>
                          </div>
                       )
                   })}
                </div>
            </div>
        </div>
    )
}

export default HowItWorks
