import { Button } from '@material-ui/core'
import React from 'react'
import { GlobalContext } from '../reducers/context'
import { GlobalShop } from './Pages/Buy/CartContext'

const SearchResult = () => {
    const {state} = GlobalContext()
    const {addToCart} = GlobalShop()
    console.log (state.searchResult)
    return (
        <div>
            {
                state.searchResult.length > 0 ? state.searchResult.map((i, idx) => {
                    return(
                        <div>{i.name}
                        <Button children={<span>Add to Cart</span>} onClick={() => addToCart(i)}/>
                        </div>
                    )
                })
               : <span>Nothing here Folk please search again</span>
            }
        </div>
    )
}

export default SearchResult
