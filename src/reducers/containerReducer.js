const defaultState = {
}

const containerReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONTAINER':

      return {...action.container}

    case 'EDIT_CONTAINER':

      return {...action.payload}

    
    default:
    return state
  }
}

export default containerReducer
