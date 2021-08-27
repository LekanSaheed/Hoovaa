import React from 'react'
import Cards from './Cards'
import HowItWorks from './HowItWorks'
import SalesComponent from './SalesComponent'
import Search from './Search'
import WhyUs from './WhyUs'
import MoreDetails from './MoreDetails'
import Partners from './Partners'
import ProductAnalysis from './ProductAnalysis'
const Home = () => {
    React.useEffect(()=> {
        window.scrollTo(0,0)
    })
    return(
        <>
         <Search/>
        <Cards/>
        <ProductAnalysis/>
        <SalesComponent/>
        <HowItWorks/>
        <WhyUs/>
        <MoreDetails/>
        <Partners/>
        </>
    )
}
export default Home