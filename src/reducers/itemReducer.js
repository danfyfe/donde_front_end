const defaultState = {

}

const itemReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SPACE':

      return {...action.payload}


    default:
    return state
  }
}

export default itemReducer
