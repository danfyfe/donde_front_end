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
      // console.log(action.payload)
      return {...state, households: [action.payload, ...state.households]}

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