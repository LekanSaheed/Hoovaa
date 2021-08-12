import React from 'react'
import Cards from './Cards'
import HowItWorks from './HowItWorks'
import SalesComponent from './SalesComponent'
import Search from './Search'
import WhyUs from './WhyUs'


const Home = () => {
    return(
        <>
         <Search/>
        <Cards/>
        <SalesComponent/>
        <HowItWorks/>
        <WhyUs/>
        </>
    )
}
export default Home