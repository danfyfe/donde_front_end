import { combineReducers } from 'redux'
import appReducer from './appReducer.js'
import userReducer from './userReducer.js'
import householdReducer from './householdReducer.js'
import spaceReducer from './spaceReducer.js'
import containerReducer from './containerReducer.js'
import itemReducer from './itemReducer.js'

const rootReducer = combineReducers({
  user: userReducer, household: householdReducer, app: appReducer, space: spaceReducer, container: containerReducer, item: itemReducer
})

export default rootReducer