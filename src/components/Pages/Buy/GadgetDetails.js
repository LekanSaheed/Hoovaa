import React, { useEffect, useState } from 'react'
import { GlobalShop } from './CartContext'
import {IconButton} from '@material-ui/core'
const GadgetDetails = () => {
    const [gadget, setGadget] = useState([])
    const {state, addToCart} = GlobalShop()
    useEffect(() => {
     const selected = JSON.parse(localStorage.getItem('selected'))
     console.log(selected, gadget)
          selected ? setGadget([selected]) : setGadget(state.clickedDevice)
    }, [gadget, state.clickedDevice])
    return (
        <div>
            DeviceDetails
            <div>
            {gadget.map((item, idx) => {
                return(
                    <div key={idx}>
                       <p> {item.name}</p>
                       <p>{item.price}</p>
                       <p>{item.brand}</p>
                       <p>{item.desc}</p>
                       <IconButton className="MuiIconButton-colorPrimary" size='small' onClick={() => addToCart(item)}>Add To cart</IconButton>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default GadgetDetails
