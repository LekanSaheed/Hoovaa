import React from 'react'
import { GlobalShop } from './CartContext'
import { Box, CardMedia, makeStyles, Button} from '@material-ui/core'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { RiBuilding2Line, RiTruckLine } from 'react-icons/ri'
import { useHistory} from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'


const GadgetDetails = ({device}) => {

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])
   
const history = useHistory()
    const useStyle = makeStyles(theme => (
        {
            container: {
                padding: '8px',
                background: '#f5f5f5'
            },
            root: {
                color: '#1b2120'
            },
            img: {
                width: '250px'
            },
            name: {
                fontSize: '20px',
                fontWeight: '500',
                textTransform: 'capitalize'
            },
            imgCon: {
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            boldText: {
                fontWeight: '700',
                padding: '15px 5px',
                fontSize: '25px',
                border: 'solid 1px #f5f5f5',
                borderLeft: 'none',
                borderRight: 'none'
            },
            desc:{
                fontSize: '13px',
                listStyle: 'disc',
                padding: '9px',
                lineHeight: '35px',
                background: '#edf1fa3c',
                color: '#89959A'
            }, 
            list: {
               
            },
            detailsGroup:{
                background: '#fff'
            },
            icons: {
                fontSize: '30px'
            },
            borderedText: {
                border: 'solid 1px #f5f5f5',
                padding: '5px',
                borderRadius: '8px',
                margin: '15px 0'
            }
        }
    ) )
    const classes = useStyle()
    const {state, addToCart} = GlobalShop()
    return (
        <div className={classes.container}>

            {device.map((item, idx) => {
                return(
                    <Box className={classes.root} display='flex'  flexDirection='column' key={idx}>
                     <CardMedia className={`MuiCardMedia-img ${classes.imgCon}`} 
                     
                     children={ <img className={classes.img} src={item.img}
                      alt='productImage'/>}/>
                       <Box padding='15px' display='flex' flexDirection='column' className={classes.detailsGroup}>
                      <Box display='flex' justifyContent='space-between' flexDirection='column' padding='5px'>
                      <p className={classes.name}> {item.name}</p>
                     
                      <p style={{fontSize: '11px', color: 'grey', marginTop: '15px'}}> <span>Brand: </span>{item.brand}</p>
                      </Box>
                     
                      
                       <p className={classes.boldText}>${item.price.toLocaleString()}</p>
                       <div className={`theme-text ${classes.borderedText}`} >AVAILABLE STORAGE</div><br/>
                       <ul className={`bordered ${classes.desc}`}>
                           <li className={classes.list}>
                               <Box display='flex'>
                                   <span style={{marginRight: '5px'}} className='theme-text'>
                                       <span className={classes.icons}><AiOutlineCreditCard/> </span>
                                       </span>
                            <span>Payment with card.</span>
                            </Box></li>
                           <li className={classes.list}>
                               <Box display='flex' >
                               <span style={{marginRight: '5px'}} className='theme-text'>
                                   <span className={classes.icons}><RiTruckLine/> </span>
                                   </span>
                           <span>Payment on delivery.</span>
                           </Box></li>
                           <li className={classes.list}>
                               <Box display='flex' >
                               <span style={{marginRight: '5px'}} className='theme-text'>
                                   <span className={classes.icons}><RiBuilding2Line/> </span>
                                   </span>
                           <span>Warehouse Pickup.</span>
                           </Box></li>
                       </ul>
                       <br/>
                       <span className='theme-text' >DEVICE DETAILS</span><br/>
                       {state.cart.find(i => i.id === item.id) ? <Button onClick={() => history.push('/cart')}
                        children={<>Item In Cart Go to cart</>} size='large' color='primary' variant='outlined'/>: 
                         <Button  size='large' variant='contained' color='primary' endIcon={<IoMdCart/>} 
                       onClick={() => addToCart(item)}>Add To cart</Button>
                       }
                     </Box>

                      {/* {state.cart.some(i => i === item) ? <>
                        <Button className={classes.contBtn} onClick={() => increment(item)}><AiFillPlusCircle/></Button>
                       {item.quantity}
                       <Button className={classes.contBtn} children={<AiFillMinusCircle/>} onClick={() => decrement(item)}/>
                       </> : } */}
                    </Box>
                )
            })}
        </div>
    )
}

export default GadgetDetails
