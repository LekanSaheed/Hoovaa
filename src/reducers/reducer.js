 const reducer = (state, action) => {
  if(action.type === "TOGGLE_NAV"){
      return{
          ...state,
          toggle: !state.toggle
      }
  }
  if(action.type === "CLOSE_NAV"){
      console.log('reached')
      return{
          ...state,
          toggle: !state.toggle
      }
  }
}
export {reducer}