import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import Header from './Components/Header'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Signout from './Components/Signout'
import Feature from './Components/Feature'

import reducers from './reducers'

import './style.scss'

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
)

export default class ClientAuth extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path="/">
            Welcome to Client Auth
          </Route>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signout" component={Signout} />
          <Route exact path="/feature" component={Feature} />
        </Router>
      </Provider>
    )
  }
}
