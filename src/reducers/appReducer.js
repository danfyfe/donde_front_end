const defaultState = {
  user: {},
  households: {},
  userHouseholdMessages: {},
  currentHousehold: {},
  currentSpace: {},
  currentContainer: {},
  currentItem: {},
  searching: false,
  isFetching: false,
  isDoneFetching: false,
  isUserHousehold: false,
  itemDeleteConfirmationMessage: ""
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
    let updatedHousehold = {...household, messages:[action.message, ...household.messages]}
    let householdIndex = state.user.households.indexOf(household)
    state.user.households.splice(householdIndex, 1, updatedHousehold)
    return {...state, user: {...state.user, households: state.user.households}}

    case "SET_CURRENT_HOUSEHOLD":
      // console.log(action.household)
      return {...state, currentHousehold: action.household}

    case "IS_USERS_HOUSEHOLD":

      return {...state, isUserHousehold: true}

    case "ADD_HOUSEHOLD_TO_CURRENT_USER":
        // console.log(action.household)
      return {...state, user: {...state.user, households:[...state.user.households, action.household]}}

    case "ADD_SPACE":
    // console.log(action.space
      return {...state, currentHousehold:{...state.currentHousehold, spaces:[...state.currentHousehold.spaces,action.space]}}

    case "ADD_ITEM":
      // console.log("add_item",action.item)
      // console.log('add_item container',state.currentContainer)
      return {...state, currentContainer:{...state.currentContainer, items:[...state.currentContainer.items, action.item]}}

    case "ADD_CONTAINER":
      // console.log('add_container',action.container)
      // console.log('add_container',state.currentSpace)
      return {...state, currentSpace: {...state.currentSpace, containers:[...state.currentSpace.containers, action.container]}}

    case "SET_CURRENT_SPACE":
      // console.log('set current space',action.space)
      return {...state, currentSpace: action.space}

    case "SET_CURRENT_CONTAINER":

      return {...state, currentContainer: action.container}

    case "SET_SEARCHING":
      // console.log('inside set_searching')
      return {...state, searching: !state.searching}

    case "SET_SEARCHING_TO_FALSE":
      // console.log('inside set seraching to false')
      return {...state, searching: false}

    case "ADD_MESSAGE_TO_CURRENTHOUSEHOLD":
        // console.log('addMtoCH', action.message)
        // console.log('addMtoCH', state.currentHousehold)
      return {...state, currentHousehold:{...state.currentHousehold, messages:[action.message, ...state.currentHousehold.messages]}}

    case "SET_CURRENT_ITEM":
      // console.log(action.item)
      return {...state, currentItem: action.item}

    case "IS_FETCHING":

      return {...state, isFetching: true}

    case "IS_DONE_FETCHING":

      return {...state, isDoneFetching: true}

    case "ITEM_DELETE_CONFIRMATION":

      return {...state, itemDeleteConfirmationMessage: "Item successfully deleted! A message has been sent to the household on your behalf"}

    case "ITEM_DELETE_CONFIRMATION_TO_NOTHING":
        return {...state, itemDeleteConfirmationMessage: ""}

    default:
      return state
  }


}

export default householdReducer