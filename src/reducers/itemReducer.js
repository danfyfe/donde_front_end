const defaultState = {

}

const itemReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ITEM':

      return {...action.payload}

    case 'EDIT_ITEM':

    return {...action.payload}

    case 'ADD_OWNERS':

    return {...action.payload}

    case 'REMOVE_OWNER':

    return {...action.payload}

    case 'MOVE_ITEM':

    return {...action.payload}

    default:
    return state
  }
}

export default itemReducer
