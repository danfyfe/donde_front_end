const defaultState = {
}

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      // console.log('inside usr reducer', action.payload)
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