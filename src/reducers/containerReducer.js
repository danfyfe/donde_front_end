const defaultState = {
}

const containerReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONTAINER':

      return {...action.container}
      
    default:
    return state
  }
}

export default containerReducer
