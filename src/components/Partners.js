import React from 'react'
import Apple from '../assets/Apple.png'
import Samsung from '../assets/Samsung.png'
import Hp from '../assets/Hp.png'
import Dell from '../assets/Dell.png'
import Nokia from '../assets/Nokia.png'
import Amazon from '../assets/Amazon.png'

const data = [
    {img: Apple},
    {img: Samsung},
    {img: Hp},
    {img: Dell},
    {img: Nokia},
    {img: Amazon},
]
const Partners = () => {
    return (
        <div>
            <h2>Our partners</h2>
            <div  className='partner-container'>
            {data.map((item, index) => {
                return(
                    <div key={index}>
                        <img src={item.img} alt='partners'/>
                    </div>
                )
            })}
            </div>
           
        </div>
    )
}

export default Partners
