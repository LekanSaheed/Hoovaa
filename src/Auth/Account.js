import React from 'react'
import { GlobalContext } from '../reducers/context'



const Account = () => {
    const {state} = GlobalContext()
    const currentUser = state.currentUser
console.log(currentUser)
    return (
        <div>
            Welcome {currentUser.email}
        </div>
    )
}

export default Account
