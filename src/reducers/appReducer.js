const defaultState = {
  user: {},
  households: {},
  userHouseholdMessages: {},
  currentHousehold: {},
  currentSpace: {},
  searching: false
}



function householdReducer (state = defaultState, action){
  // console.log(state)
  switch (action.type) {
    case "SET_USER":
      return {...state, user: action.user}
      case "SET_HOUSEHOLDS":
        return {...state, households: action.households}
    case "ADD_HOUSEHOLD":
      return {...state, user:{...state.user, households: [...state.user.households, action.household]}}
    case "SET_USERHOUSEHOLDMESSAGES":
      // console.log(action.userHouseholdMessages)
      return {state}
    case "ADD_MESSAGE":
    console.log('inside add_message',action.message)
    return state
    case "SET_CURRENT_HOUSEHOLD":
      // console.log(action.household)
      return {...state, currentHousehold: action.household}
      case "ADD_SPACE":
      // console.log(action.space
        return {...state, currentHousehold:{...state.currentHousehold, spaces:[...state.currentHousehold.spaces,action.space]}}
      case "SET_CURRENT_SPACE":
        return {...state, currentSpace: action.space}
      case "SET_SEARCHING":
      // console.log('inside set_searching')
        return {...state, searching: !state.searching}
    default:
      return state
  }


}

export default householdReducer