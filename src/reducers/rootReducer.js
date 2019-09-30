import { combineReducers } from 'redux'
import appReducer from './appReducer.js'
import userReducer from './userReducer.js'
import householdReducer from './householdReducer.js'
import spaceReducer from './spaceReducer.js'
import containerReducer from './containerReducer.js'
import itemReducer from './itemReducer.js'
import statusMessageReducer from './statusMessageReducer.js'

const rootReducer = combineReducers({
  user: userReducer, household: householdReducer, app: appReducer, space: spaceReducer, container: containerReducer, item: itemReducer, statusMessage: statusMessageReducer
})

export default rootReducer