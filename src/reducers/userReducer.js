const defaultState = {
}

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':

      return {...action.payload}

    case 'ADD_HOUSEHOLD':

      return {...state, households: [action.payload, ...state.households]}

    case 'JOIN_HOUSEHOLD':

      return {...state, households: [action.payload, ...state.households]}

    case 'LEAVE_HOUSEHOLD':

      let leftHousehold = action.payload

      let newHouseholds = state.households.filter( household => {
        return household.id !== leftHousehold.id
      })


      return {...state, households: [...newHouseholds]}

      case 'ADD_USER_MESSAGE':

      let household = state.households.find(household => {
        return household.id === action.payload.household.id
      })

      let updatedHousehold = {...household, messages: [action.payload, ...household.messages]}

      let index = state.households.indexOf(household)

      state.households.splice( index, 1, updatedHousehold)

      return { ...state }

    // case 'AUTHENTICATING_USER':
    //
    //   return {...state, authenticatingUser:true}
    // case 'AUTHENTICATED_USER':
    //
    // return {...state, authenticatingUser:false}
    //
    // case 'FAILED_LOGIN':
    //   return {
    //     ...state,
    //     failedLogin:true,
    //     error: action.payload,
    //     authenticatingUser: false
    //   }
      default:
      return state
  }
}

export default usersReducer