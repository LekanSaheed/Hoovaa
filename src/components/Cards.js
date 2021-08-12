import React from 'react'
import './Cards.css'
import { AiOutlineArrowRight } from 'react-icons/ai'

const cardData = [
    {
        titleText: 'Sell your device',
        subText: 'Sell your old phone',
        lastText: 'Get latest resale value for your device'
    },
    {
        titleText: 'Get Cash for your old device',
        subText: 'Planning to dispose it? Sell it.',
        lastText: 'Get latest resale value for your device'
    },
    {
        titleText: 'Got a bad phone? ',
        subText: 'Repair it',
        lastText: 'Over 1000 personnel to help fix it'
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
               <div>
                   <button><AiOutlineArrowRight style={{fontSize: '20px'}}/></button>
               </div>
            </div>
        )
    })
    return (
        <div>
            <div className='card-container'>
            {cardList}

            </div>
        </div>
    )
}

export default Cards
