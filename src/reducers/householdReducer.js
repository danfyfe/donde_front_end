const defaultState = {
}

const householdReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_HOUSEHOLD':

      return {...action.payload}

    case 'EDIT_HOUSEHOLD':

      return {...action.payload}

    case 'ADD_SPACE':
      // let newSpaces = [...state.spaces ]
      // newSpaces.unshift(action.payload)
      return {...state, spaces: [ action.payload, ...state.spaces ] }

    case 'ADD_HOUSEHOLD_MESSAGE':

    return {...state, messages: [action.payload, ...state.messages]}
    default:
    return state
  }
}

export default householdReducer
