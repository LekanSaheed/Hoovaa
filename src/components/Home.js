import React from 'react'
import Cards from './Cards'
import HowItWorks from './HowItWorks'
import SalesComponent from './SalesComponent'
import Search from './Search'
import WhyUs from './WhyUs'
import MoreDetails from './MoreDetails'
import Partners from './Partners'
import CartButton from './Pages/CartButton'
import BottomNav from './BottomNav'

const Home = () => {
    React.useEffect(()=> {
        window.scrollTo(0,0)
    },[])
    return(
        <>
         <Search/>
        <Cards/>
        <CartButton/>
        <SalesComponent/>
        <HowItWorks/>
        <WhyUs/>
        <MoreDetails/>
        <Partners/>
        <BottomNav/>
        </>
    )
}
export default Home