import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
// combineReducers, applyMiddleware
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import App from './App';
// import usersReducer from './reducers/usersReducer'
import { BrowserRouter, Route } from 'react-router-dom'

// const rootReducer = combineReducers({usersReducer: usersReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// const store = createStore(appReducer)

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
