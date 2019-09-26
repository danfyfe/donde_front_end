const defaultState = {
}

const householdReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_HOUSEHOLD':

      return {...action.payload}

    case 'EDIT_HOUSEHOLD':

      return {...action.payload}

    case 'ADD_SPACE':

      return {...state, spaces: [ action.payload, ...action.space ] }
    default:
    return state
  }
}

export default householdReducer
