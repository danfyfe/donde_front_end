const defaultState = {
  user: {}
}



function householdReducer (state = defaultState, action){
  // console.log(state)
  switch (action.type) {
    case "SET_USER":
    // console.log("user.action",action.user)
      // console.log("SET_USER", state)
      return {...state, user: action.user}
    case "ADD_HOUSEHOLD":
      console.log("ADD_HOUSEHOLD", action.household)
      return {state}

    default:
    return state
  }


}

export default householdReducer