 const reducer = (state, action) => {
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
  if(action.type === "SET_DEVICE_STORAGE"){
      console.log(state.newSelected)
      const name = action.payload
      const img = action.payload2
      const evaluated = Math.floor(Math.random() * 50) + 30
      return{
          ...state,
          newSelected: [{name,img, evaluated}]
      }
  }
}
export {reducer}