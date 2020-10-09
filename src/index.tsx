import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import {App} from "./App";

const composeEnhancers =
  typeof window === 'object' &&
      //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const app = (
  <Provider store={store}>
      <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
