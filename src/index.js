import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
// combineReducers, applyMiddleware
import { Provider } from 'react-redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import App from './App';
// import usersReducer from './reducers/usersReducer'
import appReducer from './reducers/appReducer.js'
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

// const rootReducer = combineReducers({usersReducer: usersReducer})

const store = createStore(appReducer)
// console.log('first load',store)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route render={({history, location}) => <App history={history} location={location} />} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
