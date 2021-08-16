import React, { useState } from 'react'
import './DeviceQuestionnaire.css'
const DeviceQuestionnaire = () => {
    const [modal, setModal] = useState(true)
    const [group, setGroup] = useState(null)
    React.useEffect(()=> {
        window.scrollTo(0,0)
        document.querySelector('.loader-container').classList.remove('loader-hide')
       setTimeout(()=> {
        document.querySelector('.loader-container').classList.add('loader-hide')
       }, 1400)
       setGroup(null)
    }, [])
   
const arr = []
    arr.push({...group, group})
    console.log(group)
    console.log(arr)
    const questions = [
        {
            label: 'screen',
            text: 'Do you have a faulty screen?',
            value: ['yes', 'no']
        },
        {
            label: 'screen',
            text: 'Do you have a faulty screen?',
            value: ['yes', 'no']
        },
        {
            label: 'Battery',
            text: 'Does Your battery Last long?',
            value: ['yes', 'no']
        },
        {
            label: 'Camera',
            text: 'Is your Camera faulty?',
            value: ['yes', 'no']
        },
        {
            label: 'Speakers',
            text: 'Are the speakers okay?',
            value: ['yes', 'no']
        },
        {
            label: 'Wifi',
            text: 'Is the Wifi working',
            value: ['yes', 'no']
        },
        {
            label: 'screen',
            text: 'Do you have a faulty screen?',
            value: ['yes', 'no']
        },
        

    ]
    return (
        <div className="question-page">
          {modal &&   <div className='modal-prompt-container'>
                <div className='modal-prompt'>
                  <div className='modal-group'>
                       <div className='para'> Please answer all questions correctly
                       <p>Questions asked will determine the total evaluation of your device</p>
                       </div>
                    <button className="close-modal" onClick={()=> setModal(false)}>Continue</button>
                    </div>
                </div>
            </div>}

            <form className="question-form">
        <div className='question-group'>
            {questions.map((item ,id) => {
                return(
                    <div className='question-items' key={id}>
                        <label>{item.label}</label><br/>
                        <p>{item.text}</p>
                        {item.value.map(val => {
                            return(
                               <>
                                <input type='radio' onChange={(e)=> setGroup(e.target.value)}  value={val} name={id}/> {val} <br/>
                               </>
                            )
                        })}


                    </div>
                )
            })}
        </div>
            </form>
        </div>
    )
}

export default DeviceQuestionnaire
