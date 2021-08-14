import React from 'react'
import './WhyUs.css'
import sell from '../assets/sell.png'
import professional from '../assets/professional.png'
const WhyUs = () => {
    const details = [
        {titleText: 'One off selling',
        img: sell,
        text: 'Sell your stuff without hassle',
        icon: ''
    },
    {titleText: 'Trained Professionals',
    img: professional,
    text: 'Over 1000 trained personnel to get your stuff fixed',
    icon: ''
},
{titleText: 'Cash back guaranteed',
text: 'If needs a refund, you can trust us on that',
icon: '',
img: sell,
},
{titleText: 'Good Conditioned gadgets',
text: 'Ours is a home for good gadgets, what you order is what you get',
icon: '',
img: professional
},
{titleText: 'Safe and Secured transactions',
text: 'We are partners with an highly secure payment system, so no need to fret, your money is safe',
icon: '',
img: professional,
},
{titleText: 'Warranty on Products',
text: 'we guaranty 100% warranty on our products',
icon: '',
img: sell,
},
{titleText: 'Product insurance',
text: 'Products come insured',
icon: '',
img: professional,
},
{titleText: 'Good customer support',
text: 'We offer good OTL customer support',
icon: '',
img: sell,
}

    ]
    return (
        <div>
            <div className='why-us-container'>
                <span>
                    Why Us?
                </span>
                <div className='why-us-details'>
        {details.map((item, index) => {
            return(
                <div key={index} className='why-us-node'>
                    <div><img src={item.img} alt='icon'/></div>
                    <p style={{fontWeight: '500', fontSize: '14px', marginBottom: '4px'}}>{item.titleText}</p>
                    <p>{item.text}</p>
                </div>
            )
        })}
                </div>
            </div>
        </div>
    )
}

export default WhyUs
