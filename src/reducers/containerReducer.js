const defaultState = {

}

const containerReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONTAINER':
      console.log(action.container)
      return {...action.container}

    default:
    return state
  }
}

export default containerReducer
