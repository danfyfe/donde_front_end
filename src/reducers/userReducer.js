const defaultState = {
}

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      // console.log('inside usr reducer', action.payload)
      return {...action.payload}

    case 'ADD_HOUSEHOLD':

      return {...state, households: [...state.households, action.payload]}

    case 'AUTHENTICATING_USER':

      return {...state, authenticatingUser:true}
    case 'AUTHENTICATED_USER':

    return {...state, authenticatingUser:false}

    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin:true,
        error: action.payload,
        authenticatingUser: false
      }
      default:
      return state
  }
}

export default usersReducer