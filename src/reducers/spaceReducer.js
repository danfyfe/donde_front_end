const defaultState = {

}

const spaceReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SPACE':

      return {...action.space}

    case 'EDIT_SPACE':

      return {...action.payload}

    case 'ADD_CONTAINER':

      return {...state, containers:[...state.containers, action.payload]}
      
    default:
    return state
  }
}

export default spaceReducer
