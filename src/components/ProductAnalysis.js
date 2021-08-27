import React from 'react'

const ProductAnalysis = () => {
    const [phones, setPhones] = React.useState([])
    const url = 'https://www.ebay.com/s/phone/propValues?required=carrier&title=phone&category_id=9355&selected_aspects=%5B%7B%22aspectName%22%3A%22Brand%22%2C%22aspectValues%22%3A%5B%7B%22value%22%3A%22Apple%22%7D%5D%7D%2C%7B%22aspectName%22%3A%22Model%22%2C%22aspectValues%22%3A%5B%7B%22value%22%3A%22iPhone%2012%20Pro%20Max%22%7D%5D%7D%5D&r=0.25359110269270846'
    React.useEffect(() => {
        fetch(url)
        .then(res => {
            if(res.ok){
                return res.json()
            }
            else throw new Error('failed')
        })
        .then(data => {
            setPhones(data)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    })
    return (
        <div>
            {phones.map(i => i.i)}
        </div>
    )
}

export default ProductAnalysis
