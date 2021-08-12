import React from 'react'
import Cards from './Cards'
import SalesComponent from './SalesComponent'
import Search from './Search'
import WhyUs from './WhyUs'


const Home = () => {
    return(
        <>
         <Search/>
        <Cards/>
        <SalesComponent/>
        <WhyUs/>
        </>
    )
}
export default Home