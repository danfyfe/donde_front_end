const defaultState = {
  user: {},
  households: {},
  userHouseholdMessages: {},
  currentHousehold: {},
  currentSpace: {},
  currentItem:{},
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

    // case "SET_USERHOUSEHOLDMESSAGES":
    //   console.log(action.userHouseholdMessages)
    //   return state
    case "ADD_MESSAGE":
    // console.log('inside add_message',action.message.household)
    let household = state.user.households.find(household=>{
      return household.id === action.message.household.id
    })
    let updatedHousehold = {...household, messages:[...household.messages, action.message]}
    let householdIndex = state.user.households.indexOf(household)
    state.user.households.splice(householdIndex, 1, updatedHousehold)
    return {...state, user: {...state.user, households: state.user.households}}

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

    case "ADD_MESSAGE_TO_CURRENTHOUSEHOLD":
        // console.log('addMtoCH', action.message)
        // console.log('addMtoCH', state.currentHousehold)
      return {...state, currentHousehold:{...state.currentHousehold, messages:[...state.currentHousehold.messages, action.message]}}


    case "SET_CURRENT_ITEM":
      // console.log(action.item)
      return {...state, currentItem: action.item}
      
    default:
      return state
  }


}

export default householdReducer