const defaultState = {

}

const spaceReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SPACE':
    
      return {...action.space}


    default:
    return state
  }
}

export default spaceReducer
