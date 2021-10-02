import React, {useState} from 'react'
import {TextField, Button, Box} from "@material-ui/core"
import Select from 'react-select'
import {options} from '../components/Pages/Repair/options'
import { db, firebase } from '../components/firebase'
import { GlobalContext } from '../reducers/context'

const EditRepair = () => {
    const oldState = JSON.parse(localStorage.getItem('oldRepairState'))
    const [name, setName] = useState(oldState.name)
    const [brand, setBrand] = useState(oldState.brand)
    const [model, setModel] = useState(oldState.model)
    const [selectedDamage, setSelectedDamage] = useState(oldState.damages)
    const {state, setModalStat} = GlobalContext()
    const handleDamage = (selectedDamage) => {
        setSelectedDamage(selectedDamage)
}

    const handleUpdate = () => {
        const loader = document.querySelector('.loader-container');
        loader.classList.remove('loader-hide');
        const rdRefs = db.collection('repairs').where('repairId', '==', oldState.docId);
        const docRef = db.collection('users').doc(state.currentUser.uid)
        .collection('repairHistory')
        .doc(oldState.docId);
        
     
     docRef.update(
         {
             name,
             brand,
             model,
             damages: selectedDamage,
             modified: firebase.firestore.Timestamp.now()
          })
             .then(() => {
                //  Update repair in admin doc
                 rdRefs.get().then(snapshot => {
                     snapshot.forEach(doc => {
                    doc.ref.update(
                        {
                            name,
                            brand, 
                            model, 
                            damages: selectedDamage,
                            modified: firebase.firestore.Timestamp.now()
                        })
                    .then(() => {
                        loader.classList.add('loader-hide')
                        setModalStat('Successfully Updated')
                        localStorage.removeItem('oldRepairState')
                    })
                    .catch(err => {console.log(err)
                        loader.classList.add('loader-hide')
                    }) 
                })
            })
             }).catch(err => {
                 setModalStat('An error Occured')
                 loader.classList.add('loader-hide')
                 console.log(err)
             })
    }
    return (
        <div>
            <div className='centered-text'>
                Edit Gadget Info 
            </div>
           <Box gridGap='15px' padding='10px' display='flex' flexDirection='column'>
           <TextField label='Gadget Name' value={name} variant='outlined' fullWidth={true} 
            onChange={(e) => setName(e.target.value)}/>
            <TextField label='Gadget Model' value={model} variant='outlined' fullWidth={true} 
            onChange={(e) => setModel(e.target.value)}/>
            <TextField label='Gadget Brand' value={brand} variant='outlined' fullWidth={true} 
            onChange={(e) => setBrand(e.target.value)}/>
             <Select isMulti={true}
            isSearchable={true}
        value={selectedDamage}
        onChange={handleDamage}
        options={options}
        placeholder='Select Damage(s)'
        theme={theme => ({
            ...theme,
            borderRadius: '50',
            fontSize: '10px',
            padding: '20px',
            colors: {
                ...theme.colors,
                primary25: '#7497ff',
                primary: 'white'
                
            }

        })}
      />
            <Button onClick={handleUpdate} disabled={!name || !model || !brand || selectedDamage.length < 1
            || selectedDamage === null || !selectedDamage} variant='outlined' color='primary' size='large'>Submit Changes</Button>
           </Box>
        </div>
    )
}

export default EditRepair
