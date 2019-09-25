import { combineReducers } from 'redux'
// import appReducer from './appReducer.js'
import userReducer from './userReducer.js'
import householdReducer from './householdReducer.js'

const rootReducer = combineReducers({
  user: userReducer, household: householdReducer
})

export default rootReducer