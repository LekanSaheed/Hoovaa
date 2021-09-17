import { Box, Input, Button } from '@material-ui/core'
import React, {useState} from 'react'
import './Admin.css'
import {makeStyles} from '@material-ui/core'
import { firebaseStorage, firebase } from '../components/firebase'


const AdminUpload = ({colRef, tag}) => {
    
    const [img, setImg] = useState(null)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [worth, setWorth] = useState(0)
    const[error, setError] = useState('')

    const useStyles = makeStyles(theme => ({
        tag: {
            background: 'grey',
            color: 'white',
            textTransform: 'uppercase'
        },
        root: {
            [theme.breakpoints.up('800')]: {
                width: '100%'
            }
        }
    }))
    const classes = useStyles()
   const types =['image/jpg', 'image/png', 'image/jpeg']
   
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


   const handleSubmit = (e) => {
   const loader = document.querySelector(".loader-container")
loader.classList.remove("loader-hide")
       e.preventDefault()
    const checked = []
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for(var i = 0; i < checkboxes.length; i++){
        checked.push(checkboxes[i].value)
    }  
        // const colRef = db.collection('usedPhones')
        const ref = firebaseStorage.ref(`/images/${img.name}`);
        const uploadTask = ref.put(img);
        uploadTask.on("state_changed", console.log, console.error, () => {
          ref
            .getDownloadURL()
            .then((iurl) => {
           //file upload
            colRef.add({
                id: new Date().getTime().toString(), name,brand, category,
 price:  parseInt(worth), storage: checked, img: iurl,
created: firebase.firestore.Timestamp.now()
            })
            .then(() => {

loader.classList.add("loader-hide")

                alert("Document successfully written!");
            })
            .catch((error) => {

loader.classList.add("loader-hide")

                alert("Error writing document: ", error);
            });
            });
        });
    
   }
  
    return (
        <div className={classes.root}>
           <Box className={classes.tag} padding='10px' children={<span>{tag}</span>}/>
            <form className='form-control'>
                {error && error}
              <div className='input-container'>
                  <label>Device Image</label>
                   <Input type='file' onChange={handleImg}/>
              </div>
               <div className='input-container'>
                   <label>Device Name</label>
                   <Input type='text' value={name} onChange={(e) => setName(e.target.value)} required/>
               </div>
               <div className='input-container'>
                   <label>Device Brand</label>
                   <Input type='text'  value={brand} onChange={(e) => setBrand(e.target.value)} required/>
               </div>
              
               <div className='input-container'>
                   <label>Category</label>
                   <Input type='text'  value={category} onChange={(e) => setCategory(e.target.value)} required/>
               </div>
               <div className='input-container'>
                   <label>Device Worth</label>
                   <Input type='number' value={worth} onChange={(e) => setWorth(e.target.value.toLocaleString())} required/>
               </div>
               
               <div className='check-container'>
                   <label>Storage</label>
                 <div className='checks'> <span>8GB</span> <Input disableUnderline={true} type='checkbox' value="8000000000" required/> </div>
                   <div className='checks'>
                       <span>16GB</span>
                   <Input type='checkbox' disableUnderline={true} value='17179869184' required/>
                   </div>
                   <div className='checks'>
                       <span>32GB</span>
                   <Input type='checkbox' disableUnderline={true} value='34359738368' required/>
                   </div>
                  <div className='checks'><span>64GB</span> <Input disableUnderline={true} type='checkbox' value='68719476736' required/></div>
                  <div className='checks'><span>128GB</span> <Input disableUnderline={true} type='checkbox' value='137438953472' required/></div>
                  <div className='checks'><span>256GB</span> <Input disableUnderline={true} type='checkbox' value='274877906944' required/></div>
                   <div className='checks'><span>512GB</span><Input disableUnderline={true} type='checkbox' value='549755813888' required/></div>
                   <div className='checks'>
                       <span>1TB</span>
                   <Input disableUnderline={true} type='checkbox' value='1099511627776' required/>
                   </div>
                  <div className='checks'><span>2TB</span> <Input type='checkbox' disableUnderline={true} value='2199023255552' required/></div>
               </div>
             
               <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
            </form>
            
            
        </div>
    )
}

export default AdminUpload
