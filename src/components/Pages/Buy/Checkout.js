import { Box, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import {PaystackButton} from 'react-paystack'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../../reducers/context'
import { db } from '../../firebase'
import { GlobalShop } from './CartContext'


const Checkout = () => {
    const history = useHistory()
    const {setModalStat} = GlobalContext()
const newState = GlobalContext().state
    React.useEffect(() => {
        !newState.isUser && history.push('/login')
    })
    const {state, clearCart} = GlobalShop()
   
  const publicKey = "pk_test_92a93b84a772b5837f40984aba6db9fcf7b20582"
  const amount = state.totalAmount + "00" // Remember, set in kobo!
  const [email, setEmail] = useState(newState.currentUser.email)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
    
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
    {
    setModalStat('Transaction Successful')
   
    db.collection('orders').set(state.totalAmount)
    .then(() => {
        alert('set succesfully')
         clearCart()
        window.location.reload()
        history.push('/account')})
        .catch(err => {
            console.log(err)
        })
},
    onClose: () => setModalStat('Transaction Canceled'),
  }
    return (
        <Box display='flex' flexDirection='column' className="checkout-form">
            <Box>Pay {state.totalAmount.toLocaleString()}</Box>
        <div className="checkout-field">
        
          <TextField
          variant='standard'
          label='Name'
          fullWidth={true}
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="checkout-field">
        
          <TextField
          variant='standard'
          label='Email'
          fullWidth={true}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="checkout-field">
         
          <TextField
          variant='standard'
          label='Phone No'
          fullWidth={true}
            type="number"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
       
       
      <PaystackButton className="paystack-button" {...componentProps} />
      </Box>
    )
}

export default Checkout
