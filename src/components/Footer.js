import React from 'react'
import {  AiOutlineDollar, AiOutlineTwitter, AiTwotoneInsurance } from 'react-icons/ai'
import { FaFacebook, FaTools } from 'react-icons/fa'
import { IoMdCash } from 'react-icons/io'
import { RiExchangeBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './Footer.css'

const footer = () => {
    const footerdata = [
        {
            text: 'Buy',
            link: '/buy-item',
            icon: <AiOutlineDollar/>,
            category: 'quick-links'
        },
        {
            text: 'Sell',
            link: '/sell-item',
            icon: <IoMdCash/>,
            category: 'quick-links'
        },
        {
            text: 'Swap',
            link: '/swap-item',
            icon: <RiExchangeBoxLine/>,
            category: 'quick-links'
        },
        {
            text: 'Repair',
            link: '/repair-device',
            icon: <FaTools/>,
            category: 'quick-links'
        },
        {
            text: 'Gadget Insurance',
            link: '/insurance',
            icon: <AiTwotoneInsurance/>,
            category: 'quick-links'
        },
        {
            text: 'Facebook',
            link: '/insurance',
            icon: <FaFacebook/>,
            category: 'follow'
        },

        {
            text: 'Twiiter',
            link: '/insurance',
            icon: <AiOutlineTwitter/>,
            category: 'follow'
        }
    ]
    return (
        <div className='footer-container'>
            <div className='footer-child'>
          <div>
        Quick links
        <ul>
            {footerdata.filter((item) => item.category === 'quick-links' ).map((item, index) => {
                 return(
                    <li>
                        <Link key={index} to={item.link}>
                            <div className='footer-child-flex'>{item.icon}<span>{item.text}</span></div>
                        </Link>
                    </li>

                )
            })}
        </ul>
          </div>
          <div>
              Follow
              <ul>
            {footerdata.filter((item) => item.category === 'follow' ).map((item, index) => {
                 return(
                    <li>
                        <Link key={index} to={item.link}>
                            <div className='footer-child-flex'>{item.icon}<span>{item.text}</span></div>
                        </Link>
                    </li>

                )
            })}
        </ul>
          </div>
          <div>
              Contact us
          </div>
            </div>
            <div className='account-footer'>
         <div className='af-child'>
              <span className='theme-text'>TEAM HOOVAA </span>
          <span className='af-node'>
              <span> &copy; {new Date().getFullYear().toString()} </span>
              </span>
          <span>All rights reserved.</span></div>
      </div>
        </div>
    )
}

export default footer
