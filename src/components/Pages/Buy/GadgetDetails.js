import React, { useEffect } from 'react'
import { GlobalShop } from './CartContext'
import {IconButton, Box, CardMedia, makeStyles} from '@material-ui/core'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { RiTruckLine } from 'react-icons/ri'

const GadgetDetails = ({device}) => {
    const {addToCart} = GlobalShop()
    useEffect(() => {
    window.scrollTo(0,0)
    }, [])

    const useStyle = makeStyles(theme => (
        {
            root: {
                color: '#1b2120'
            },
            img: {
                width: '100%'
            },
            imgCon: {
                background: '#fafafa'
            },
            boldText: {
                fontWeight: '700'
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
                listStyleType: 'disc'
            }
        }
    ) )
    const classes = useStyle()
    return (
        <div>
            DeviceDetails
            {device.map((item, idx) => {
                return(
                    <Box className={classes.root} display='flex'  flexDirection='column' key={idx}>
                     <CardMedia className={`MuiCardMedia-img ${classes.imgCon}`} children={ <img className={classes.img} src={item.img} alt='productImage'/>}/>
                      <Box display='flex' justifyContent='space-between' padding='15px'>
                      <p className={classes.boldText}> {item.name}</p>
                       <p className={classes.boldText}>${item.price.toLocaleString()}</p>
                      </Box>
                       <Box padding="15px">{item.brand}</Box>
                       <Box padding='15px' display='flex' flexDirection='column'>
                       <span className='theme-text bordered' >AVAILABLE STORAGE</span><br/>
                       <ul className={`bordered ${classes.desc}`}>
                           <li className={classes.list}><Box display='flex' alignItems='flex-end'><span style={{marginRight: '5px'}} className='theme-text'><AiOutlineCreditCard/> </span>
                            <span>Payment with card.</span></Box></li>
                           <li className={classes.list}><Box display='flex' alignItems='flex-end'><span style={{marginRight: '5px'}} className='theme-text'><RiTruckLine/> </span>
                           <span>Payment on delivery.</span></Box></li>
                       </ul>
                       <br/>
                       <span className='theme-text' >DEVICE DETAILS</span><br/>
                       </Box>
                       <IconButton className="MuiIconButton-colorPrimary" size='small' onClick={() => addToCart(item)}>Add To cart</IconButton>
                    </Box>
                )
            })}
        </div>
    )
}

export default GadgetDetails
