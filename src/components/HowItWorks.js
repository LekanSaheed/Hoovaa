import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './HowItWorks.css'
const HowItWorks = () => {
    const details = [
        {
            id: 1,
            title: 'Check price',
            text: 'Select your device & tell us about its current condition, our advanced Ai tech will make the perfect price for you'
        },
        {
            id: 2,
            title: 'Schedule Pickup',
            text: 'Book a pickup, whether home or work, our personnel gets there'
        },
        {
            id: 3,
            title: 'Get Paid',
            text: 'You get paid as soon as our personnel picks up your device'
        }
    ]
    return (
        <div>
            <div className='how-container'>
                <span className='how-cont-title'>How it works</span>
                <>
                   {details.map(item => {
                       return(
                           <div className='how-flex' key={item.id}>
                               <AiOutlineCloseCircle style={{marginBottom: '-40px'}}/>
                                {/* <img src='' alt='how'/> */}
                    <div className='how-group'>
                    <p><span className='how-serial'>
                    {item.id}
                    </span> <span style={{fontWeight: '600', fontSize: '14px', marginBottom: '4px'}}>{item.title}</span></p>
                    <p className='how-node'>{item.text}</p>
                    </div>
                          </div>
                       )
                   })}
                </>
            </div>
        </div>
    )
}

export default HowItWorks
