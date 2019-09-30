const defaultState = {};

const statusMessageReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE':

      console.log(action.payload)
      return state

    default:
      return state
  }
}

export default statusMessageReducer