 const reducer = (state, action) => {
     if(action.type === 'SET_PHONES'){
         return{
             ...state,
             phones: action.payload
         }
     }
  if(action.type === "TOGGLE_NAV"){
      return{
          ...state,
          toggle: !state.toggle
      }
  }
 
  if(action.type === "CLOSE_NAV"){

      return{
          ...state,
          toggle: !state.toggle
      }
  }
  if(action.type === 'SET_SELECTED_DEVICE'){
      return{
          ...state,
          selectedDevice: [action.payload]
      }
  }
  if(action.type === 'SET_CITY'){
    return{
        ...state,
        isCity: false,
        city: action.payload
    }
}
  if(action.type === "SET_DEVICE_STORAGE"){
      const name = action.payload
      const img = action.payload2
      const price = action.payload3
      const usedDevicePercent = price * 20 / 100
      const evaluated = price - usedDevicePercent
      return{
          ...state,
          newSelected: [{name,img, evaluated, price}]
      }
  }
}
export {reducer}