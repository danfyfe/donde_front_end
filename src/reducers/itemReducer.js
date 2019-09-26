const defaultState = {
  
}

const itemReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ITEM':

      console.log('inside item reducer', action.payload)

      return {...action.payload}


    default:
    return state
  }
}

export default itemReducer
