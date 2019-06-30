const defaultState = {
  user: {},
  households: {},
  messages: {}
}



function householdReducer (state = defaultState, action){
  // console.log(state)
  switch (action.type) {
    case "SET_USER":
      // console.log("user.action",action.user)
      // console.log("SET_USER", state)
      return {...state, user: action.user}
      case "SET_HOUSEHOLDS":
        return {...state, households: action.households}
    case "ADD_HOUSEHOLD":
      // console.log("ADD_HOUSEHOLD STATE",state.user)
      console.log("ADD_HOUSEHOLD", action.household)
      return {...state, user:{...state.user, households: [...state.user.households, action.household]}}
    case "SET_MESSAGES":
      // console.log(action.messages)
      return {...state, messages: action.messages}
    case "ADD_MESSAGE":

    return state
    default:
    return state
  }


}

export default householdReducer