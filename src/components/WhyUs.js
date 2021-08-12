import React from 'react'
import './WhyUs.css'

const WhyUs = () => {
    const details = [
        {titleText: 'One off selling',
        text: 'Sell your stuff without hassle',
        icon: ''
    },
    {titleText: 'Trained Professionals',
    text: 'Over 1000 trained personnel to get your stuff fixed',
    icon: ''
},
{titleText: 'One off selling',
text: 'Sell your stuff without',
icon: ''
},
{titleText: 'One off selling',
text: 'Sell your stuff without',
icon: ''
},
{titleText: 'One off selling',
text: 'Sell your stuff without',
icon: ''
},
{titleText: 'One off selling',
text: 'Sell your stuff without',
icon: ''
}

    ]
    return (
        <div>
            <div className='why-us-container'>
                <span>
                    Why Us?
                </span>
                <p className='why-us-details'>
        {details.map((item, index) => {
            return(
                <div key={index} className='why-us-node'>
                    <p>{item.icon}</p>
                    <p style={{fontWeight: '500', fontSize: '14px', marginBottom: '4px'}}>{item.titleText}</p>
                    <p>{item.text}</p>
                </div>
            )
        })}
                </p>
            </div>
        </div>
    )
}

export default WhyUs
