const defaultState = {

}

const householdReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_HOUSEHOLD':
    
      return {...action.payload}
    case "ADD_HOUSEHOLD":
      return {...action.payload}



    default:
    return state
  }
}

export default householdReducer
