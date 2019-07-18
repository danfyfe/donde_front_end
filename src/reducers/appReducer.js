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
  switch (action.type) {
    case "SET_USER":
      return {...state, user: action.user}

    case "SET_HOUSEHOLDS":
      return {...state, households: action.households}

    case "ADD_HOUSEHOLD":
      return {...state, user:{...state.user, households: [...state.user.households, action.household]}}

    case "ADD_MESSAGE":

      let household = state.user.households.find(household=>{
        return household.id === action.message.household.id
      })

      let updatedHousehold = {...household, messages:[action.message, ...household.messages]}

      let householdIndex = state.user.households.indexOf(household)
      state.user.households.splice(householdIndex, 1, updatedHousehold)

      return {...state, user: {...state.user, households: state.user.households}}

    case "SET_CURRENT_HOUSEHOLD":

      return {...state, currentHousehold: action.household}

    case "IS_USERS_HOUSEHOLD":

      return {...state, isUserHousehold: true}

    case "ADD_HOUSEHOLD_TO_CURRENT_USER":

      return {...state, user: {...state.user, households:[...state.user.households, action.household]}}

    case "ADD_SPACE":

      return {...state, currentHousehold:{...state.currentHousehold, spaces:[...state.currentHousehold.spaces,action.space]}}

    case "UPDATE_SPACE":
        let spaceToBeUpdated = state.currentHousehold.spaces.find(space => {
          return space.id === action.space.id
        })

        let spaceToBeUpdatedIndex = state.currentHousehold.spaces.indexOf(spaceToBeUpdated)

        state.currentHousehold.spaces.splice(spaceToBeUpdatedIndex, 1, action.space)

        return state

    case "ADD_ITEM":

      return {...state, currentContainer:{...state.currentContainer, items:[...state.currentContainer.items, action.item]}}

    case "ADD_CONTAINER":

      return {...state, currentSpace: {...state.currentSpace, containers:[...state.currentSpace.containers, action.container]}}

    case "UPDATE_CONTAINER":


      return state

    case "SET_CURRENT_SPACE":

      return {...state, currentSpace: action.space}

    case "SET_CURRENT_CONTAINER":

      return {...state, currentContainer: action.container}

    case "SET_SEARCHING":

      return {...state, searching: !state.searching}

    case "SET_SEARCHING_TO_FALSE":

      return {...state, searching: false}

    case "ADD_MESSAGE_TO_CURRENTHOUSEHOLD":

      return {...state, currentHousehold:{...state.currentHousehold, messages:[action.message, ...state.currentHousehold.messages]}}

    case "SET_CURRENT_ITEM":

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