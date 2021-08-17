import React, {useState} from 'react'
import './Admin.css'
const Admin = () => {
    
    const [img, setImg] = useState(null)
    const [brandImg, setBrandImg] = useState(null)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [worth, setWorth] = useState(0)
    const [storage, setStorage] = useState([])
    const[error, setError] = useState('')

   const types =['image/jpg', 'image/png', 'image/jpeg']
   
   const allData = []
   const handleSubmit = (e) => {
    const checked = []
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for(var i = 0; i < checkboxes.length; i++){
        checked.push(checkboxes[i].value)
        setStorage(checked)
    }
       e.preventDefault()
       allData.push({id: new Date().getTime().toString(), name,brand, category, worth:  parseInt(worth), storage: storage})
       console.log(allData)
   }
    const handleImg = (e) => {
        const selected = e.target.files[0]
        
        if(selected && types.includes(selected.type)){
            
            setImg(selected)
            setError('')
            console.log(selected)
            console.log(img)
        }
        else if(!selected){
            setError('no file selected')
            console.log('no file')
        }
        else{
            setError('invalid file type')
            setImg(null)
           console.log('invalid')
        }
    }
   
    const handleBrandImg = (e) => {
        const selected = e.target.files[0]

        if(selected && types.includes(selected.type)){
            
            setBrandImg(selected)
            setError('')
            console.log(selected)
            console.log(brandImg)
        }
        else if(!selected){
            setError('no file selected')
            console.log('no file')
        }
        else{
            setError('invalid file type')
            setBrandImg(null)
           console.log('invalid')
        }
    }
    
  
    return (
        <div>
            Upload Device
            <form className='form-control'>
                {error && error}
              <div className='input-container'>
                   <input type='file' onChange={handleImg}/>
              </div>
              <div  className='input-container'>
              <input type='file' onChange={handleBrandImg}/>
              </div>
               <div className='input-container'>
                   <label>Device Name</label>
                   <input type='text' value={name} onChange={(e) => setName(e.target.value)} required/>
               </div>
               <div className='input-container'>
                   <label>Device Brand</label>
                   <input type='text'  value={brand} onChange={(e) => setBrand(e.target.value)} required/>
               </div>
              
               <div className='input-container'>
                   <label>Category</label>
                   <input type='text'  value={category} onChange={(e) => setCategory(e.target.value)} required/>
               </div>
               <div className='input-container'>
                   <label>Device Worth</label>
                   <input type='number' value={worth} onChange={(e) => setWorth(e.target.value)} required/>
               </div>
               
               <div className='check-container'>
                   <label>Storage</label>
                 <div className='checks'> <span>8GB</span> <input type='checkbox' value="8 GB" required/> </div>
                   <div className='checks'>
                       <span>16GB</span>
                   <input type='checkbox' value='16 GB' required/>
                   </div>
                  <div className='checks'><span>64GB</span> <input type='checkbox' value='64 GB' required/></div>
                  <div className='checks'><span>128GB</span> <input type='checkbox' value='128 GB' required/></div>
                  <div className='checks'><span>256GB</span> <input type='checkbox' value='256 GB' required/></div>
                   <div className='checks'><span>512GB</span><input type='checkbox' value='512 GB' required/></div>
                  <div className='checks'><span>2TB</span> <input type='checkbox' value='2 TB' required/></div>
               </div>
               <div className='input-container'>
                   <label>Screen Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Battery Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Speaker Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Charging port Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Rough Body Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Wifi Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Network Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
                <div className='input-container'>
                   <label>No Receipt Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <div className='input-container'>
                   <label>Firmware Deficit</label>
                   <input type='number' placeholder='0' required/>Naira

               </div>
               <button onClick={handleSubmit}>Submit</button>
            </form>
            
            
        </div>
    )
}

export default Admin
