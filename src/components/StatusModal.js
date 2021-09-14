import React from 'react'
import { GrClose } from 'react-icons/gr'
import { BsCheckCircle } from 'react-icons/bs'
import './StatusModal.css'
import { GlobalShop } from './Pages/Buy/CartContext'
import { GlobalContext } from '../reducers/context'


const StatusModal = ({modalContent}) => {
    const {closeModal} = GlobalShop()
    const {close} = GlobalContext()
    setTimeout(()=> {
        closeModal() 
        close()
    }, 4000)

    return (
        <div>
           <div className='stat-modal-group'>
         <div className='stat-first-child'>
         <div className='stat-check'>  <BsCheckCircle/></div>
           <div className='stat-modal-content'>{modalContent}</div>
         </div>
          <div className='stat-close' onClick={closeModal}>
                <GrClose/></div>
           </div>
        </div>
    )
}

export default StatusModal
