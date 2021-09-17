import React, { useState } from 'react'
import './DeviceQuestionnaire.css'
import question from '../../../assets/question.png'
import {GlobalContext} from '../../../reducers/context'
const DeviceQuestionnaire = () => {

    
    React.useEffect(()=> {
        window.scrollTo(0,0)
        document.querySelector('.loader-container').classList.remove('loader-hide')
       setTimeout(()=> {
        document.querySelector('.loader-container').classList.add('loader-hide')
       }, 1400)
    }, [])

    const {state} = GlobalContext()
    const [modal, setModal] = useState(true)
    const selectedDevice = state.newSelected
    const deviceWorth = selectedDevice[0].evaluated
    const [isBadScreen, setIsBadScreen] = useState(false)
 const [isBadBattery, setIsBadBattery] = useState(false)
 const [isBadChargingPort, setIsBadChargingPort] = useState(false)
 const [isBadNetwork, setIsBadNetwork] = useState(false)
 const [isBadSpeaker, setIsBadSpeaker] = useState(false)
 const [isBadJack, setIsBadJack] = useState(false)
 const [isScratches, setIsScratches] = useState(false)
 const [isCracked, setIsCracked] = useState(false)
  const [calcWorth, setCalcWorth] = useState(0)
  
 const questions = [
     {
         titleText: '1. Is your Screen damaged?',
         text: 'Check your Mobile for Screen damages, like blank screen, decoloration, different colors, dot on Screen',
        subText: 'NOTE: If your Screen has scratches only and still shows well, leave this answer as NO',
        value: isBadScreen,
        function: () => setIsBadScreen(true),
        function2: () => setIsBadScreen(false),
        name: 'screen'
      },
      {
        titleText: '2. Does your Speaker sound well?',
        text: 'Check your Device\'s speaker for uninterupted sound or puncture',
       subText: 'NOTE: If your speaker sounds but doesnt sound well, leave this answer as YES',
       value: isBadSpeaker,
       function: () => setIsBadSpeaker(false),
       function2: () => setIsBadSpeaker(true),
       name: 'speaker'
     },
     {
        titleText: '3. Can you make calls?',
        text: 'Check your Device for internet connectivity and also for network signal',
       subText: '',
       value: isBadNetwork,
       function: () => setIsBadNetwork(false),
       function2: () => setIsBadNetwork(true),
       name: 'network'
     },
     {
        titleText: '4. Does your charging port work well ?',
        text: 'Check your Device\'s charging port if it connects to adapter and charge well',
       subText: '',
       value: isBadChargingPort,
       function: () => setIsBadChargingPort(false),
       function2: () => setIsBadChargingPort(true),
       name: 'chargingPort'
     },
     {
        titleText: '5. Does your Battery last long?',
        text: 'Check your Device\'s Battery if it lasts more than 7hrs',
       subText: 'NOTE: If your device\'s battery unit is Below 3000mAh and it lasts above 5hrs but not up to 7hours leave the answer as YES',
       value: isBadBattery,
       function: () => setIsBadBattery(false),
       function2: () => setIsBadBattery(true),
       name: 'battery'
     },
     {
        titleText: '6. Can you connect to a Earpiece/handsfree or any wired device?',
        text: 'Check your Mobile\'s earpiece jack for connectivity',
       subText: '',
       value: isBadJack,
       function: () => setIsBadJack(false),
       function2: () => setIsBadJack(true),
       name: 'jack'
     },
     {
        titleText: '7. Do you have Cracks on your device\' screen ?',
        text: 'Check your Mobile\'s screen for cracks',
       subText: 'NOTE: If your your screen works well but have cracks, leave question 1 as N0 and leave this as yes',
       value: isCracked,
       function: () => setIsCracked(true),
       function2: () => setIsCracked(false),
       name: 'cracks'
     },
       {
        titleText: '8. Are there scratches on your device body?',
        text: 'Check your Mobile\'s body for scratches',
       subText: 'NOTE: If you have less than two scratches on your device, leave this answer as No, else if the scratches are more than one leave as yes YES',
       value: isScratches,
       function: () => setIsScratches(true),
       function2: () => setIsScratches(false),
       name: 'scratches'
     }
 ]

  const arr = []
    const calculateValue = (e) => {
        e.preventDefault()
        const screenDeficit = deviceWorth * 48.9 / 100
        const batteryDeficit = deviceWorth * parseFloat(10.4) / 100
        const scratchDeficit = deviceWorth * 15 / 100
        const networkDeficit = deviceWorth * parseFloat(10.9) / 100
        const crackDeficit = deviceWorth * parseFloat(18.7) / 100
        const portDeficit = deviceWorth * parseFloat(19.8) / 100
        const speakerDeficit = deviceWorth * 14 / 100
        const jackDeficit = deviceWorth * 16 / 100

        if(isBadScreen){
            const totalValue = deviceWorth - screenDeficit
            console.log(deviceWorth - totalValue)
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isBadJack){
            const totalValue = deviceWorth - jackDeficit
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isBadSpeaker){
            const totalValue = deviceWorth - speakerDeficit
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isBadBattery){
            const totalValue = deviceWorth - batteryDeficit
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isBadChargingPort){
            const totalValue = deviceWorth - portDeficit
            console.log(totalValue)
            console.log('Total Worth', calcWorth) 
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isBadNetwork){
            const totalValue = deviceWorth - networkDeficit
            console.log(totalValue)
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isScratches){
            const totalValue = deviceWorth - scratchDeficit
            console.log(totalValue)
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        if(isCracked){
            const totalValue = deviceWorth - crackDeficit
            console.log(totalValue)
            console.log('Total Worth', calcWorth) 
            const percentPrice = deviceWorth - totalValue
            arr.push(percentPrice)
        }
        console.log("array", arr)
        const totalDeficit =   arr.reduce((x,y) => x + y, 0)
      
       if(deviceWorth - totalDeficit <= 0){
           setCalcWorth(Math.floor(Math.random() * (1150 - 210 + 1)) + 210)
       }
       else{
        setCalcWorth(deviceWorth - totalDeficit)
       }


    
    }
 const isAnswered =   document.querySelectorAll('input[type=radio]:checked').length === questions.length
 const removeFilter = () => {
    setModal(false)
    document.querySelector('.question-form').classList.remove('blur-add')
 }

    return (
        <div className="question-page">
          {modal &&   <div className='modal-prompt-container'>
                <div className='modal-prompt'>
                  <div className='modal-group'>
                      <div>
                          <img src={question} alt='question'/>
                      </div>
                       <div className='para'>
                            <span style={{fontWeight:'700', fontSize: '15px'}}>Please answer all questions correctly</span>
                       <p>Your answers will determine the total evaluation of your device</p>
                       </div>
                    <button className="close-modal" onClick={removeFilter}>Got it</button>
                    </div>
                </div>
            </div>}

            <form className="question-form blur-add">
        <div className='question-group'>
            <div style={{margin: '15px', fontWeight: '500', fontSize: '18px', textAlign: 'center'}}>Tell us few things about your device</div>
           {questions.map((item,index)=> {
               return(
                   <div key={index} className='question-items'>
                      <p style={{fontWeight: '600', fontSize: '14px'}}>{item.titleText}</p>
            <p> * {item.text}<br/>
            <sub className='qs-subtext'>  {item.subText}</sub>  </p>
           <div className='radio-group'>
         <label className='radio-select'>  
         <input type='radio' value={item.value} name={item.name} onChange={item.function}/><div>Yes</div></label>
           <label className='radio-select'> 
           <input type='radio' value={item.value} name={item.name} onChange={item.function2}/><div>No</div></label>
            </div>
                    </div>
               )
           })}
        </div>

       <div className="qs-btn"> 
       <button disabled={!isAnswered} style={{backgroundColor: `${!isAnswered ? '#dee6ff' : "#7497ff"}`}} onClick={calculateValue}>Continue</button></div>
        {parseFloat(calcWorth)}Naira
            </form>
        </div>
    )
}

export default DeviceQuestionnaire
