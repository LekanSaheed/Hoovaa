import React from 'react'
import Cards from './Cards'
import HowItWorks from './HowItWorks'
import SalesComponent from './SalesComponent'
import Search from './Search'
import WhyUs from './WhyUs'
import MoreDetails from './MoreDetails'
import Partners from './Partners'
const Home = () => {
    return(
        <>
         <Search/>
        <Cards/>
        <SalesComponent/>
        <HowItWorks/>
        <WhyUs/>
        <MoreDetails/>
        <Partners/>
        </>
    )
}
export default Home