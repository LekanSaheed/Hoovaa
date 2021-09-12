import React from 'react'
import BottomNav from '../BottomNav'
import RepairGadgets from './Repair/RepairGadgets'

const RepairDevice = () => {
    return (
        <div>
            <div className='centered-text'>What would you like to repair?</div>
            <BottomNav/>
            <RepairGadgets/>
        </div>
    )
}

export default RepairDevice
